import {
  body, param, sanitizeBody,
} from 'express-validator';
// Models
import User from '../models/User';
// middleware
import validate from '../middlewares/validationResult';

// consts ---------------------
const {
  AUTH_TOKEN,
} = process.env;
const TOKEN = 'TOKEN';
const COOKIE = 'COOKIE';
// helpers --------------------------
const checkUsername = (username, { req }) => User.findOne({ username }).then((user) => {
  if (username === req?.session?.user?.username) return Promise.resolve();
  if (user) return Promise.reject(new Error('Username already in use'));
});
const checkEmail = (email, { req }) => User.findOne({ email }).then((user) => {
  if (email === req?.session?.user?.email) return Promise.resolve();
  if (user) return Promise.reject(new Error('E-mail already in use'));
});

// rules ----------------------------------
export default {
  show: [
    param('username').not().isEmpty().trim()
      .isLength({ min: 4, max: 28 }),
    validate(),
  ],
  register: [
    body('email').isEmail().custom(checkEmail),
    body('password').trim().isLength({ min: 5, max: 78 }),
    body('fullname').trim().isLength({ min: 5, max: 78 }),
    body('auth_token').trim().custom(value => (
      value === AUTH_TOKEN
        ? Promise.resolve()
        : Promise.reject(new Error('Invalid Authentication Token'))
    )),
    body('username').not().isEmpty().trim()
      .isLength({ min: 4, max: 28 })
      .custom(checkUsername),
    body('grantType').isIn([TOKEN, COOKIE]),
    validate(),
  ],
  login: [
    sanitizeBody('password').customSanitizer(value => String(value)),
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 78 }),
    body('grantType').isIn([TOKEN, COOKIE]),
    validate(),
  ],
  update: [
    param('id').isMongoId(),
    body('username').isLength({ min: 4, max: 28 })
      .custom(checkUsername),
    body('email').isEmail().custom(checkEmail),
    body('description').isLength({ min: 4, max: 480 })
      .trim().escape()
      .optional({ checkFalsy: true })
      .withMessage('must have a size between 4 and 480 chars'),
    body('fullname').isLength({ min: 4, max: 48 })
      .trim().escape()
      .optional({ checkFalsy: true })
      .withMessage('must have a size between 4 and 48 chars'),
    validate(),
  ],
};
