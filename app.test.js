/* eslint-disable arrow-body-style */
const request = require('supertest');
const { app, knex } = require('./app');

const article = {
  title: 'John P. Lucas',
  extract: 'Major General John Porter Lucas (January 14, 1890 – December 24, 1949) was a senior officer of the United States Army who saw service in World War I and World War II. He is most notable for being the commander of the U.S. VI Corps during the Battle of Anzio (Operation Shingle) in the Italian Campaign of World War II.',
  edited: '2016-11-19T22:57:32.639Z',
};

describe('Simplepedia API', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });

  // SuperTest has several helpful methods for conveniently testing responses
  // that we can use to make the tests more concises

  test('GET /articles should return all movies (mostly SuperTest)', () => {
    return request(app).get('/articles')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect([Object.assign({ _id: 1 }, article)]);
  });

  describe('POST operations', () => {
    test('Should create new article', () => {
      const newArticle = { title: 'A new article', extract: 'Article body', edited: '2016-11-19T22:57:32.639Z' };
      return request(app).post('/articles').send(newArticle)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(Object.assign({ _id: 2 }, newArticle));
    });

    test('Should reject article with duplicate title', () => {
      return request(app).post('/articles').send(article)
        .expect(400);
    });

    test('Should reject article with no title', () => {
      return request(app).post('/articles').send({})
        .expect(400);
    });

    test('Should reject article with a null title', () => {
      return request(app).post('/articles').send({ title: null })
        .expect(400);
    });

    test('Should reject article with no edited time', () => {
      return request(app).post('/articles').send({ title: 'A title' })
        .expect(400);
    });

    test('Should reject article with invalid edited time', () => {
      return request(app).post('/articles').send({ title: 'A title', edited: '4' })
        .expect(400);
    });

    test('Should create a default extract', () => {
      const newArticle = { title: 'A title', edited: '2016-11-19T22:57:32.639Z' };
      return request(app).post('/articles').send(newArticle)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(Object.assign({ _id: 2, extract: '' }, newArticle));
    });
  });

  describe('DELETE operations', () => {
    test('Should delete article', () => {
      return request(app).delete('/articles/1')
        .expect(200)
        .then(() => {
          return request(app).get('/articles')
            .expect(200)
            .expect([]);
        });
    });
  });

  describe('PUT operations', () => {
    test('Should update article', () => {
      const newArticle = Object.assign({ _id: 1 }, article, { extract: 'New extract' });
      return request(app).put('/articles/1').send(newArticle)
        .expect(200)
        .expect(newArticle);
    });

    test('Should update article to id in URL', () => {
      const newArticle = Object.assign({ _id: 2 }, article, { extract: 'New extract' });
      return request(app).put('/articles/1').send(newArticle)
        .expect(200)
        .expect(Object.assign({ _id: 1 }, article, { extract: 'New extract' }));
    });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });
});
