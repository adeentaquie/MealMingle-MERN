// src/components/MainHeader.js
import { Link } from "react-router-dom"; // Use Link from react-router-dom
import { useDispatch, useSelector } from "react-redux"; // Access Redux state for user info and dispatch actions
import { logout } from "../../../redux/slices/authSlice"; // Import the logout action from your auth slice
import logoImg from "../../../assets/logo.png"; // Logo image path
import classes from "./main-header.module.css"; // CSS for the header
import NavLink from "./NavLink"; // Assuming NavLink is a custom component for links
import MainHeaderBackground from "./MainHeaderBackground"; // Background component

export default function MainHeader() {
  const { userId } = useSelector((state) => state.auth); // Access userId from Redux state
  const dispatch = useDispatch(); // To dispatch actions to Redux store

  // Dynamically construct the href for Browse Meals based on userId
  const mealsLink = userId ? `/meals/${userId}` : "/meals"; // Fallback to '/meals' if no userId

  // Handle logout logic when the user clicks the Logout link
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to reset the state
    localStorage.removeItem("userId"); // Clear userId from localStorage (if you're using it)
    localStorage.removeItem("name"); // Clear name from localStorage (if you're using it)
  };

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} to="/home">
          <img src={logoImg} alt="logo image" />
          MEAL MINGLE
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              {/* Dynamically link to the meals page with userId if logged in */}
              <NavLink to={mealsLink}>Browse Meals</NavLink>
            </li>
            <li>
              <NavLink to="/community">Community</NavLink>
            </li>
            <li>
              {userId && (
                <NavLink
                  to="/"
                  className={classes.logoutLink}
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
