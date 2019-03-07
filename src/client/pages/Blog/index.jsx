// Dependencies
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { map, endWith, tap } from 'rxjs/operators';
import { autobind } from 'core-decorators';
// flow types
import type { Match } from 'react-router-dom';
import type { Dispatch } from 'redux';
// assets
import { container, sectionHeader } from '../../assets/sass/App.scss';
// actions
import { setPosts } from '../../../shared/actions/blogActions';
// Components
import Page from '../../components/Wrappers/Page';
// Request
import request from '../../../shared/utils/Request.js';
// assets
import styles from '../../assets/sass/Blog.scss';


type Action = {
  type: string,
  payload: {},
};

type Post = {
  id: number,
  title: string,
  body: string,
};

type GetState = () => {};

type Props = {
  fetchPosts(): void,
  goBack(): void,
  posts: Array<Post>,
};

class Blog extends Component<Props> {
  static initialAction(dispatch: Dispatch<Action>, getState: GetState, match: Match) {
    console.log(getState(), match);
    return request({ url: '/api/blog' }).pipe(
      map(ajax => ajax.response),
      tap(res => dispatch(setPosts(res.data))),
      endWith(null)
    );
  }

  componentDidMount() {
    const { fetchPosts, posts } = this.props;
    if (!posts) {
      fetchPosts();
    }
  }

  @autobind
  goTo() {
    const { goBack } = this.props;
    goBack();
  }

  render() {
    const { posts } = this.props;
    return (
      <Page title="Blog">
        <div className={container}>
          <section className={sectionHeader}>
            <button onClick={this.goTo} type="button" title="go back">
              <FontAwesomeIcon icon="chevron-left" />
            </button>
            <h2>
              <FontAwesomeIcon icon="blog" />
              {' Blog'}
            </h2>
          </section>
          <section>
            {
              posts
                ? posts.map(({
                  id, title, body,
                }) => (
                  <article className={styles.article} key={id}>
                    <h4>
                      {`${id} - `}
                      {title}
                    </h4>
                    <p>{body}</p>
                  </article>
                ))
                : (
                  <article className={styles.article}>
                    <p>Loading...</p>
                  </article>
                )
            }
          </section>
        </div>
      </Page>
    );
  }
}

export default Blog;
