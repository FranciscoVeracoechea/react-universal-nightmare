// dependencies
import React from 'react';
import { hot } from 'react-hot-loader';
// font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
// Components
import Wrapper from './Wrapper';
import Nav from './Nav/Nav';
// assets
import reactLogo from '../assets/img/react.svg';
import styles from '../assets/sass/App.scss';


library.add(fas, far, fab);

const App = ({ children }) => (
  <div>
    <Wrapper>
      <header className={styles.header}>
        <img src={reactLogo} alt="react logo" className={styles.logo} />
        <h1 className={styles.title}>Universal React Nightmare</h1>
        <Nav />
      </header>
    </Wrapper>
    <main>
      { children }
    </main>
  </div>
);

export default hot(module)(App);
