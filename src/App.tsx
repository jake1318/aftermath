import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Swap from "./pages/Swap";
import Pools from "./pages/Pools";
import Farms from "./pages/Farms";
import { ROUTES } from "./utils/constants";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.SWAP} element={<Swap />} />
          <Route path={ROUTES.POOLS} element={<Pools />} />
          <Route path={ROUTES.FARMS} element={<Farms />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
