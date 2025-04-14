import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"; // Import useLocation to track the route
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Community from "./pages/Community";
import SignupForm from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MealsPage from "./pages/MealsPage";
import ShareMealPage from "./pages/ShareMealPage";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

// Wrapper component to conditionally render Layout based on the route
function AppRoutes() {
  const location = useLocation(); // Get the current location (route)

  // Check if the current route is not "/"
  const shouldRenderLayout = location.pathname !== "/"; // Exclude Layout on login page

  return (
    <>
      {/* Conditionally render Layout based on current route */}
      {shouldRenderLayout && <Layout />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />

        {/* MealsPage should be evaluated first */}
        <Route path="/meals/:userId" element={<MealsPage />} /> {/* MealsPage route should be first */}

        {/* ShareMealPage should be evaluated second */}
        <Route path="/meals/:userId/share" element={<ShareMealPage />} /> {/* ShareMealPage route should be second */}
      </Routes>
    </>
  );
}

export default App;
