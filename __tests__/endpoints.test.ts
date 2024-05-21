import app from '../src';
import request from 'supertest';

import seed from '../src/data/seed';
import { dbOpen, dbClose } from '../src/db-connection';

beforeAll(async () => {
	await dbOpen();
});
beforeEach(async () => {
	await seed();
});
afterAll(async () => {
	await dbClose();
});

describe('404 General Not Found Error', () => {
	test('404: When path does not exist', () => {
		return request(app)
			.get('/api/incorrect-path')
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toBe('Not Found');
			});
	});
});

describe('/api', () => {
	test('GET /api - responds with endpoints.json', async () => {
		const { body } = await request(app).get('/api').expect(200);
		expect(body.endpoints).toMatchObject({
			'GET /api': {
				description: expect.any(String),
			},
		});
	});
});

describe('/api/users', () => {
	test('GET /api - responds with an array of all users', async () => {
		const { body } = await request(app).get('/api/users').expect(200);
		const { users } = body;
		expect(users.length).toBe(5);
		users.forEach((user: object) => {
			expect(user).toMatchObject({
				_id: expect.any(Number),
				username: expect.any(String),
				password: expect.any(String),
				email: expect.any(String),
				films: expect.any(Array),
				stats: expect.any(Object),
			});
		});
	});
});

describe('/api/users/:userId/films', () => {
	test('GET 200 /api/users/:userId/films', async () => {
    const {body} = await request(app).get('/api/users/5/films').expect(200)
    const {films} = body;
    expect(films.length).toBe(4)
    films.forEach((film: object) => {
      expect(film).toMatchObject({
				_id: expect.any(Number),
				title: expect.any(String),
				directors: expect.any(Array),
				genres: expect.any(Array),
				release_year: expect.any(Number),
				synopsis: expect.any(String),
				poster_url: expect.any(String),
				lead_actors: expect.any(Array),
				runtime: expect.any(Number),
				rating: expect.any(Number),
        date_watched: expect.any(String)
			});
    })
    });
});

describe('/api/films', () => {
	test('GET /api/films - responds with an array of all films', async () => {
		const { body } = await request(app).get('/api/films').expect(200);
		const { films } = body;
		expect(films.length).toBe(30);
		films.forEach((film: object) => {
			expect(film).toMatchObject({
				_id: expect.any(Number),
				title: expect.any(String),
				directors: expect.any(Array),
				genres: expect.any(Array),
				release_year: expect.any(Number),
				synopsis: expect.any(String),
				poster_url: expect.any(String),
				lead_actors: expect.any(Array),
				runtime: expect.any(Number),
			});
		});
	});
});
