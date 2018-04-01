/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require('fs');

const contents = fs.readFileSync('seed.json');
const data = JSON.parse(contents);

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries then use batch insert because we have
  // too many articles for simple insert
  return knex('Article').del()
    .then(() => knex.batchInsert('Article', data, 100));
};
