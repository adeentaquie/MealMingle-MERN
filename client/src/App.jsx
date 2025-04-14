import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Community from "./pages/Community";
import SignupForm from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/home" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
