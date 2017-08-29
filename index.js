const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const volleyball = require('volleyball');
const db = require('./db');

app.use(volleyball);
app.use(bodyParser.json());

app.use('/api', require('./apiRoutes'));


app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

db.then(() => {
  app.listen(process.env.PORT || 3000, function () {
    console.log("Rockin out on port 3000 homie");
  });
})