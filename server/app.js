// server/app.js
const express = require("express");
const morgan = require("morgan");
const path = require("path");
// const db = require("./knex.js");
// const graphqlHTTP = require("express-graphql");
// const { buildSchema } = require("graphql");


const app = express();

// Setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "dist")));

module.exports = app;
