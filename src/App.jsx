import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ScanPage from "./pages/ScanPage";
import ItemPage from "./pages/ItemPage";

export default function App() {
  return (
    <BrowserRouter basename="/React-Mobile-POS-Project/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/item" element={<ItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}