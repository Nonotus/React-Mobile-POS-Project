import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ScanPage from "./pages/ScanPage";
import ItemPage from "./pages/ItemPage";

export default function App() {
  return (
    <BrowserRouter basename="/React-Mobile-POS-Project/">
      <Routes>
        {/* 👇 DEFAULT PAGE (important fix) */}
        <Route path="/" element={<HomePage />} />

        {/* 👇 extra safety (fixes GitHub Pages edge case) */}
        <Route index element={<HomePage />} />

        <Route path="scan" element={<ScanPage />} />
        <Route path="item" element={<ItemPage />} />

        {/* 👇 fallback route (prevents blank screen) */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}