import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
// actions
import * as actions from '../../../shared/actions/blogActions';
// Component
import Blog from './Blog';


const mapStateToProps = ({ blog }) => ({
  posts: blog.posts,
});

const mapDispatchToProps = {
  ...actions,
  goBack,
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
