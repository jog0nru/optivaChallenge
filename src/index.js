require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const {server: {port}} = require('./infrastructure/config');
const container = require('./container');
const logger = container.resolve('logger');
const metricsLogger = container.resolve('metricsLogger');
const handleError = require('./infrastructure/rest/middleware/error-handler');

app.use(metricsLogger);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// require('./infrastructure/process/update-database-process')();

app.use('*', function(req, res) {
  res.status(404).send();
});

app.use(handleError);

const server = app.listen(port, () =>
  logger.info(`App listening at http://localhost:${port}`));

module.exports = {app, server};
