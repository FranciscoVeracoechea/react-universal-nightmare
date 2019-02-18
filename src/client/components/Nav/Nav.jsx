import React from 'react';
import { NavLink } from 'react-router-dom';
// assets
import styles from '../../assets/sass/Nav.scss';


const Nav = () => (
  <nav className={styles.navigation}>
    <ul>
      <li>
        <NavLink activeClassName={styles.active} to="/" exact>Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName={styles.active} to="/about" exact>About</NavLink>
      </li>
      <li>
        <NavLink activeClassName={styles.active} to="/blog" exact>Blog</NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
