// @flow
// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { map, tap } from 'rxjs/operators';
import { autobind } from 'core-decorators';
// assets
import { container } from '../../assets/sass/App.scss';
// actions
import * as actions from '../../../shared/actions/blogActions';
// Components
import Page from '../Wrappers/Page';
// Request
import request from '../../../shared/utils/Request.js';


type Props = {
  fetchPost(text: string): void,
  goback(): void,
  posts: string,
};

class Blog extends Component<Props> {
  static initialAction(dispatch) {
    return request({
      useBaseUrl: false,
      url: 'https://api.github.com/users/FranciscoVeracoechea',
    }).pipe(
      map(result => result.response),
      tap(res => dispatch(actions.fetchUser(res.bio)))
    );
  }

  componentDidMount() {
    const { fetchPost, posts } = this.props;
    if (!posts) {
      fetchPost('dispatched from the CLIENT!...');
    }
  }

  @autobind
  handleOnClick() {
    const { fetchPost } = this.props;
    fetchPost('Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, sint! ');
  }

  @autobind
  goTo() {
    const { goback } = this.props;
    goback();
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
          &nbsp;
          <button onClick={this.goTo} type="button">Go Back</button>
          <p>{ posts }</p>
        </div>
      </Page>
    );
  }
}

export default connect(({ blog }) => ({
  posts: blog.posts,
}), {
  ...actions, goback: url => goBack(url),
})(Blog);
