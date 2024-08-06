import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import DetailsPage from "./pages/DetailsPage";

import Dashboard from "./pages/Dashboard";
import Layout from "./Layout";

function App() {
  return (
    //Routes definition
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="productsPage" element={<ProductsPage />} />
        <Route path="detailsPage" element={<DetailsPage />} />
        {/* <Route path="infoPage" element={<InfoPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
