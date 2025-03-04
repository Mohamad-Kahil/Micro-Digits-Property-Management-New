import { Routes, Route, useRoutes } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import Properties from "./components/properties";
import Tenants from "./components/tenants";

function App() {
  const tempoRoutes = import.meta.env.VITE_TEMPO === "true" ? routes : [];

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties/*" element={<Properties />} />
        <Route path="/tenants/*" element={<Tenants />} />
        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
      </Routes>
    </>
  );
}

export default App;
