import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Login";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here like /community and /meals */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
