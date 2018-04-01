/* eslint-disable no-console */
/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

// db-errors provides a consistent wrapper around database errors
const { wrapError, ConstraintViolationError } = require('db-errors');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);

const { Model } = require('objection');
const Article = require('./models/Article');

// Bind all Models to a knex instance.
Model.knex(knex);

const app = express();

const corsOptions = {
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  origin: '*',
  allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With', 'Origin'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/articles', (request, response, next) => {
  Article.query().then((articles) => {
    response.send(articles);
  }, next); // <- Notice the "next" function and catch handler
});

app.post('/articles/', (request, response, next) => {
  Article.query().insertAndFetch(request.body).then((article) => {
    response.send(article);
  }, next);
});

app.delete('/articles/:id', (request, response, next) => {
  Article.query().deleteById(request.params.id).then((result) => {
    response.sendStatus(200);
  }, next);
});

app.put('/articles/:id', (request, response, next) => {
  // Overwrite any existing _id with the id form the URL
  const { _id, ...updatedArticle } = request.body; // eslint-disable-line no-unused-vars
  Article.query().updateAndFetchById(request.params.id, updatedArticle).then((article) => {
    response.send(article);
  }, next);
});

// A very simple error handler. In a production setting you would
// not want to send information about the inner workings of your
// application or database to the client.
app.use((error, request, response, next) => {
  if (response.headersSent) {
    next(error);
  }

  const wrappedError = wrapError(error);
  if (wrappedError instanceof ConstraintViolationError) {
    response.sendStatus(400);
  } else {
    response.sendStatus(error.statusCode || error.status || 500);
  }
});

module.exports = {
  app,
  knex,
};
