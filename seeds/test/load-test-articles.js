/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('Article').del()
    .then(() =>
      // Inserts seed entries
      knex('Article').insert([
        {
          title: 'John P. Lucas',
          extract: 'Major General John Porter Lucas (January 14, 1890 – December 24, 1949) was a senior officer of the United States Army who saw service in World War I and World War II. He is most notable for being the commander of the U.S. VI Corps during the Battle of Anzio (Operation Shingle) in the Italian Campaign of World War II.',
          edited: '2016-11-19T22:57:32.639Z',
        },
      ]));
};
