// dependencies
import React from 'react';
// font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
// import { fab } from '@fortawesome/free-brands-svg-icons';
// Components
import Clickable from './Wrappers/Clickable';
import Nav from './Nav/Nav';
// assets
import reactLogo from '../assets/img/react.svg';
import styles from '../assets/sass/App.scss';


library.add(fas, far);

const handleOnClick = () => {
  document.title = 'Nightmare';
};

const App = ({ children }) => (
  <div>
    <Clickable onClick={handleOnClick}>
      <header className={styles.header}>
        <img src={reactLogo} alt="react logo" className={styles.logo} />
        <h1 className={styles.title}>React Universal Nightmare</h1>
        <Nav />
      </header>
    </Clickable>
    <main>
      { children }
    </main>
  </div>
);

export default App;
