import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLayoutEffect } from "react";
import Lenis from "lenis";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";

function App() {
  useLayoutEffect(() => {
    const lenis = new Lenis();
    (window as any).lenis = lenis; // <--- TAMBAHKAN BARIS INI

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;