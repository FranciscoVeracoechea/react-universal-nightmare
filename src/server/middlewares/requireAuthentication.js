import passport from 'passport';
import { newError } from '../../shared/utils/functional';
import {
  ifElse, Left, Right,
} from '../../shared/utils/Either';


const { SECRET } = process.env;
const isSelfRequest = ua => /node.js/i.test(ua);


export default () => (request, res, next) => ifElse(request)(
  r => isSelfRequest(r.get('user-agent')) && r.get('Authorization') === SECRET
)
  .fold(req => Right(req), () => Left(null))
  .chain(req => ifElse(req)(
    ({ session }) => (!session && !session.isAuthenticated && !session.user)
  ))
  .fold(() => Left(null), req => Right(req))
  .chain(req => ifElse(req)(
    r => (r.get('Authorization')
      ? Right(passport.authenticate('jwt', { session: false }))
      : Left(newError('Unauthenticated')))
  ))
  .fold(
    err => (err ? next(err({ status: 401 })) : next()),
    passportMiddleware => passportMiddleware(request, res, next)
  );
