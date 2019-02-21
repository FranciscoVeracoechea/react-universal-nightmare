import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { container } from '../../assets/sass/App.scss';
// Components
import Page from '../Wrappers/Page';


const About = () => (
  <Page title="About">
    <div className={container}>
      <h2>
        <FontAwesomeIcon icon="info-circle" />
        &nbsp;
        About
      </h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At repellendus nostrum et, excepturi adipisci ullam animi sequi repudiandae ipsa soluta?
      </p>
    </div>
  </Page>
);


export default About;
