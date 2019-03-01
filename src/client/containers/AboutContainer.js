import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
// Component
import About from '../components/AboutPage/About';


const mapStateToProps = null;

const mapDispatchToProps = {
  goBack,
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
