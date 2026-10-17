import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import ServiceDetail from "./components/ServiceDetail";
import ScrollManager from "./components/ScrollManager";
import Footer from "./components/Footer";
import { useReveal } from "./useReveal";

export default function App() {
  const { pathname } = useLocation();
  useReveal(pathname);
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <ScrollManager />
      <Footer />
    </>
  );
}
