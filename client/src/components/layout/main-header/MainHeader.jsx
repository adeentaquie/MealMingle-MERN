import { Link } from 'react-router-dom';
import logoImg from '../../../assets/logo.png';
import classes from './main-header.module.css';
import NavLink from './NavLink';
import MainHeaderBackground from "./MainHeaderBackground"
export default function MainHeader() {
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
              <NavLink to="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink to="/community">Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
