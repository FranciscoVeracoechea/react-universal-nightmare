// dependencies
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
// configs
import appSetter from './configs/appSetter';
import development from './configs/development';
import production from './configs/production';
// middlewares
import deviceDetection from './middlewares/deviceDetection';
// API router
import ApiRouter from './API';


dotenv.config();
const isAnalyzer = process.env.ANALYZER === 'true';
const isDev = process.env.NODE_ENV === 'development';

const app = express();
appSetter(app);

app.use('/', express.static(path.join(__dirname, '..', '..', 'public')));
app.use('/static', express.static(path.join(__dirname, '..', '..', 'static')));
app.use(favicon(path.join(__dirname, '..', '..', 'static', 'favicon.ico')));
app.use(cors());
app.use(helmet());
app.use(deviceDetection());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

ApiRouter(app);

// development configurations
development(app, isDev);
// production configurations
production(app, isDev);

app.listen(app.get('port'), (err) => {
  if (!err && !isAnalyzer) {
    console.info(`Server listening on ${process.env.APP_URL}`);
  } else if (isAnalyzer) {
    console.info(`Client report on ${app.get('browserEnv').appUrl}/static/clientReport.html`);
    console.info(`Server report on ${app.get('browserEnv').appUrl}/static/serverReport.html`);
  }
});
