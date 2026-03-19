// App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Collections from "./page/Collections";
import Atelier from "./page/Atelier";
import Contact from "./page/Contact";
import Service from "./page/Service";
import Lookbook from "./page/LookBook";
import NotFound from "./page/NotFound";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/atelier" element={<Atelier />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Service />} />
      <Route path="/lookbook" element={<Lookbook />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
