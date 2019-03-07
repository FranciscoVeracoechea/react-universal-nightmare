import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Components
import Page from '../../components/Wrappers/Page';
// assets
import { container, homeHeader } from '../../assets/sass/App.scss';


const Home = () => (
  <Page>
    <div className={container}>
      <section className={homeHeader}>
        <h2>
          <FontAwesomeIcon icon="home" />
          {' Home'}
        </h2>
      </section>
      <section>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quia asperiores omnis ea ducimus consequuntur cum molestiae, rem ratione, dolorem temporibus ex laudantium tempora aliquid delectus provident inventore. Soluta, sit.
        </p>
      </section>
    </div>
  </Page>
);

export default Home;
