import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { container } from '../../assets/sass/App.scss';
// Components
import Page from '../Wrappers/Page';


const Home = () => (
  <Page>
    <div className={container}>
      <h2>
        <FontAwesomeIcon icon="home" />
        &nbsp;
        Home
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quia asperiores omnis ea ducimus consequuntur cum molestiae, rem ratione, dolorem temporibus ex laudantium tempora aliquid delectus provident inventore. Soluta, sit.
      </p>
    </div>
  </Page>
);

export default Home;
