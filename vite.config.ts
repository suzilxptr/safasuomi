import type { IncomingMessage, ServerResponse } from "node:http";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Serves api/*.ts at /api/* during `vite dev`, mimicking Vercel functions.
function localApi(mode: string): Plugin {
  return {
    name: "local-api",
    apply: "serve",
    configureServer(server) {
      for (const [k, v] of Object.entries(loadEnv(mode, process.cwd(), ""))) {
        process.env[k] ??= v;
      }

      server.middlewares.use("/api", async (req: IncomingMessage, res: ServerResponse, next) => {
        const name = (req.url ?? "").split("?")[0].replace(/^\/+|\/+$/g, "");
        if (!/^[\w-]+$/.test(name)) return next();

        const chunks: Buffer[] = [];
        let size = 0;
        for await (const chunk of req) {
          size += chunk.length;
          if (size > 100_000) {
            res.statusCode = 413;
            return res.end();
          }
          chunks.push(chunk);
        }
        const raw = Buffer.concat(chunks).toString();
        let body: unknown = {};
        try {
          body = raw ? JSON.parse(raw) : {};
        } catch {
          // leave empty; handler will reject
        }

        const vres = Object.assign(res, {
          status(code: number) {
            res.statusCode = code;
            return vres;
          },
          json(data: unknown) {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(data));
            return vres;
          },
        });

        try {
          const mod = await server.ssrLoadModule(`/api/${name}.ts`);
          await mod.default(Object.assign(req, { body }), vres);
        } catch (err) {
          server.config.logger.error(String(err));
          if (!res.writableEnded) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "server_error" }));
          }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), localApi(mode)],
}));
