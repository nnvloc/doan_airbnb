import 'module-alias/register';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import CORS from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '@src/swagger';

// import {
// 	publicRoutes,
// 	secureRoutes,
// 	adminRoutes,
// } from '@modules';
import appRoutes from '@modules';

import passportJWT from '@middlewares/passportjwt';

// import adminValidatorMiddleware from '@middlewares/adminValidate';
import db from '@models';

import Logger from '@src/logger';
import HttpLogger from '@src/logger/httpLogger';

const AppLogger = new Logger('APP');

db.sequelize
  .authenticate()
  .then(() => {
    AppLogger.info('Connection has been established successfully.');
  })
  .catch(err => {
    AppLogger.error('Unable to connect to the database: ',err);
});

const app = express();
app.use(CORS());
app.use(express.static(path.join(__dirname, './')));
app.use(HttpLogger);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/api/v1', appRoutes);

// Init swagger url for API documents
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling
app.use((err, req, res, next) => {
	if (process.env.NODE_ENV === 'development') {
		console.log(err);
		AppLogger.error(err.message, err);
  }
  
  // Custom Errorhandling
  // E.g: Call sentry.io (err)

	res.status(500);
	let errorMsg = process.env.NODE_ENV === 'development' ? err.message : 'general server error!';
	if (
		err.status === 401
		|| err.status === 400
		|| err.status === 409
	) {
		res.status(err.status);
		errorMsg = err.message;
	}

	res.json({
		success: false,
		error: errorMsg,
	});
});

module.exports = app;
