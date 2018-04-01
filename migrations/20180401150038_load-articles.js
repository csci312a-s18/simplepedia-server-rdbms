/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
exports.up = function (knex, Promise) {
  return knex.schema.createTable('Article', (table) => {
    table.increments('_id');
    table.string('title').unique().notNullable();
    table.text('extract');
    table.string('edited').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('Article');
};
