import { NavLink as RouterNavLink } from 'react-router-dom';
import classes from './nav-link.module.css';

export default function NavLink({ to, children }) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${classes.link} ${classes.active}` : classes.link
      }
    >
      {children}
    </RouterNavLink>
  );
}
