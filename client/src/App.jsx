import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* Add more routes here like /community and /meals */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
