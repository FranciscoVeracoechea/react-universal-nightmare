// dependencies
import jwt from 'jsonwebtoken';
// Models
import User from '../models/User';
// utils
import { newError } from '../../shared/utils/functional';


const {
  SECRET, APP_URL, TOKEN_LIFE, APP_TITLE,
} = process.env;
const TOKEN = 'TOKEN';
const COOKIE = 'COOKIE';
const jwtOptions = { expiresIn: TOKEN_LIFE, audience: APP_URL, issuer: APP_TITLE };

// helper methods
const getSafeData = ({ salt: _s, password: _p, ...data }) => data;


// response methods
export const index = () => (req, res, next) => User.find({}, '-salt -password')
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(next);

export const show = () => (req, res, next) => User.findOne(
  { username: req.params.username },
  '-salt -password'
)
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(next);

// response methods
export const userInfo = () => (req, res) => res.status(200)
  .json({
    message: 'Sucessfull Request',
    data: { user: getSafeData(req?.user?._doc || req.session.user) },
  });

export const register = () => (req, res, next) => {
  const {
    email, username, password, grantType, fullname,
  } = req.body;
  User.create({
    email,
    username,
    password,
    fullname,
  }).then(({ _doc: data }) => {
    if (grantType === TOKEN) {
      jwt.sign(
        { username: data.username, _id: data._id, email: data.email },
        SECRET,
        jwtOptions,
        (error, token) => {
          if (error) next(newError('Error signing token')({ status: 500, error }));
          res.status(200).json({
            message: 'User created in successfully!',
            data: { user: getSafeData(data) },
            token: `Bearer ${token}`,
          });
        }
      );
    } else if (grantType === COOKIE) {
      req.session.isAuthenticated = true;
      req.session.user = {
        _id: data._id,
        username: data.username,
        email: data.email,
      };
      res.status(200).json({
        message: 'User created in successfully!',
        data: { user: getSafeData(data) },
      });
    }
  })
    .catch(next);
};

export const login = () => (req, res, next) => {
  const {
    email, password, grantType,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) return next(newError('Account Not Found')({ status: 404 }));
      if (user.checkPassword(password)) {
        const { _doc: data } = user;
        if (grantType === TOKEN) {
          jwt.sign(
            { username: data.username, _id: data._id, email: data.email },
            SECRET,
            jwtOptions,
            (error, token) => {
              if (error) next(newError('Error signing token')({ status: 500, error }));
              res.status(200).json({
                message: 'User created in successfully!',
                data: { user: getSafeData(data) },
                token: `Bearer ${token}`,
              });
            }
          );
        } else if (grantType === COOKIE) {
          req.session.isAuthenticated = true;
          req.session.user = {
            _id: data._id,
            username: data.username,
            email: data.email,
          };
          res.status(200).json({
            message: 'User created in successfully!',
            data: { user: getSafeData(data) },
          });
        }
      } else {
        next(newError('Invalid Credentials')({ status: 401 }));
      }
    })
    .catch(next);
};

export const logout = () => (req, res) => {
  req.session = null;
  res.status(200).json({
    message: 'User logged out!',
  });
};

export const update = () => (req, res, next) => User.findByIdAndUpdate(
  req.params.id,
  {
    username: req.body.username,
    email: req.body.email,
    description: req.body.description,
    fullname: req.body.fullname,
  },
  { new: true },
  (err, data) => {
    if (err) return next(err);
    res.status(200).json({
      message: 'Sucessfull Request',
      data,
    });
  },
);
