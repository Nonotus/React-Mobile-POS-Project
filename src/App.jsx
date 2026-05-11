import { HashRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ScanPage from "./pages/ScanPage";
import ItemPage from "./pages/ItemPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Scan page */}
        <Route path="/scan" element={<ScanPage />} />

        {/* Item page (QR lands here) */}
        <Route path="/item" element={<ItemPage />} />

        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}