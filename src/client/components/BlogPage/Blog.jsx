// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// assets
import { container } from '../../assets/sass/App.scss';
// actions
import * as actions from '../../../shared/actions/blogActions';
// Components
import Page from '../Wrappers/Page';


class Blog extends Component {
  static initialAction() {
    return actions.fetchPost('dispatched from the SERVER!...');
  }

  componentDidMount() {
    const { fetchPost, posts } = this.props;
    if (!posts) {
      fetchPost('dispatched from the CLIENT!...');
    }
  }

  handleOnClick = () => {
    const { fetchPost } = this.props;
    fetchPost('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, sint! ');
  }

  render() {
    const { posts } = this.props;
    return (
      <Page title="Blog">
        <div className={container}>
          <h2>
            <FontAwesomeIcon icon="blog" />
            &nbsp;
            Blog
          </h2>
          <button onClick={this.handleOnClick} type="button">Get Data</button>
          <p>{ posts }</p>
        </div>
      </Page>
    );
  }
}

export default connect(({ blog }) => ({
  posts: blog.posts,
}), actions)(Blog);
