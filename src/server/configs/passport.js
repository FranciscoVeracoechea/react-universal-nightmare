// dependencies
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
// modles
import User from '../models/User';


dotenv.config();
const {
  SECRET, APP_URL, APP_TITLE,
} = process.env;

if (!SECRET) {
  console.error('SECRET-KEY IS NOT DEFINED, pls execute "npm run create-secret"');
  process.exit(0);
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
  audience: APP_URL,
  issuer: APP_TITLE,
};

passport.use(
  new JwtStrategy(options, (payload, done) => {
    User.findById(payload._id)
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(error => done(error, false));
  })
);

export default passport;
