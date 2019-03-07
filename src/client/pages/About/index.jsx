// @flow
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { autobind } from 'core-decorators';
// Components
import Page from '../../components/Wrappers/Page';
// assets
import styles from '../../assets/sass/App.scss';


type Props = {
  goBack(): void,
};

class About extends Component<Props> {
  @autobind
  goTo() {
    const { goBack } = this.props;
    goBack();
  }

  render() {
    return (
      <Page title="About">
        <div className={styles.container}>
          <section className={styles.sectionHeader}>
            <button type="button" onClick={this.goTo} title="go back">
              <FontAwesomeIcon icon="chevron-left" />
            </button>
            <h2>
              <FontAwesomeIcon icon="info-circle" />
              {' About'}
            </h2>
          </section>
          <article>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. At repellendus nostrum et, excepturi adipisci ullam animi sequi repudiandae ipsa soluta?
            </p>
          </article>
        </div>
      </Page>
    );
  }
}


export default About;
