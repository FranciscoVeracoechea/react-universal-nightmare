import dotenv from 'dotenv';


dotenv.config();

const browserEnv = {
  appTitle: process.env.APP_TITLE,
  appUrl: process.env.APP_URL,
  facebookId: process.env.FACEBOOK_APP_ID,
  defaultDescription: process.env.DEFAULT_DESCRIPTION,
  defaultTwitter: process.env.DEFAULT_TWITTER,
  env: process.env.NODE_ENV,
};

const appSetter = (app) => {
  app.set('port', process.env.NODE_PORT || 3333);
  app.set('node_env', process.env.NODE_ENV);
  app.set('browserEnv', browserEnv);
  global.browserEnv = browserEnv;
};

export default appSetter;
