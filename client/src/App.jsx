import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
        <Route path="/" element={<Login />} />

          <Route path="/home" element={<Home />} />
          {/* Add more routes here like /community and /meals */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
