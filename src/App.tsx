import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Properties from "./components/properties";
import Tenants from "./components/tenants";
import Maintenance from "./components/maintenance";
import Finance from "./components/finance";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties/*" element={<Properties />} />
        <Route path="/tenants/*" element={<Tenants />} />
        <Route path="/maintenance/*" element={<Maintenance />} />
        <Route path="/finance/*" element={<Finance />} />
      </Routes>
    </>
  );
}

export default App;
