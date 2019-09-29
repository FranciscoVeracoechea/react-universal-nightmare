import moment from 'moment';


export default date => moment.duration(moment(date).diff(moment.now())).humanize(true);
