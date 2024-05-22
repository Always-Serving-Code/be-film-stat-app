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
	test('404: When path does not exist', async () => {
		const { body } = await request(app).get('/api/incorrect-path').expect(404);
		expect(body.msg).toBe('Not Found');
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

describe('/api/users/:user_id', () => {
	test('GET 200/api/users/:user_id - responds with an object of user associated with the user id', async () => {
		const { body } = await request(app).get('/api/users/2').expect(200);
		const { user } = body;
		expect(user[0]).toMatchObject({
			_id: 2,
			username: 'northy',
			password: 'titlo22',
			email: 'norty22@gmail.com',
			films: [],
			stats: {
				num_films_watched: 0,
				hours_watched: 0,
			},
		});
	});
	test('GET 400 /api/users/:user_id - responds with an error message when passed an invalid id', async () => {
		const { body } = await request(app).get('/api/users/cat').expect(400);
		const { msg } = body;
		expect(msg).toBe('Bad Request');
	});
	test('GET 404 /api/users/:user_id - responds with an error message when passed an id that does not exist', async () => {
		const { body } = await request(app).get('/api/users/200').expect(404);
		const { msg } = body;
		expect(msg).toBe('Not Found');
	});
});

describe('/api/users/:userId/films', () => {
	test('GET 200 /api/users/:user_id/films', async () => {
		const { body } = await request(app).get('/api/users/5/films').expect(200);
		const { films } = body;
		expect(films.length).toBe(4);
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
				date_watched: expect.any(String),
			});
		});
	});
	test('GET 404 /api/users/:user_id/films - user id not found', async () => {
		const { body } = await request(app)
			.get('/api/users/6000/films')
			.expect(404);
		expect(body.msg).toBe('Not Found');
	});
	test('GET 404 /api/users/:user_id/films - user exists but no associated films', async () => {
		const { body } = await request(app).get('/api/users/1/films').expect(404);
		expect(body.msg).toBe('No Films Added Yet!');
	});
	test('GET 400 /api/users/:user_id/films - invalid user id', async () => {
		const { body } = await request(app)
			.get('/api/users/garbage/films')
			.expect(400);
		expect(body.msg).toBe('Bad Request');
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

describe('/api/users/:user_id/:film_id', () => {
	test('DELETE 204 /api/users/:user_id/:film_id - removes an existing film from the users history', async () => {
		await request(app).delete('/api/users/5/1').expect(204);
	});
	test('DELETE 204 /api/users/:user_id/:film_id - stats associated with the user are updated', async () => {
		await request(app).delete('/api/users/5/1').expect(204);
		const { body } = await request(app).get('/api/users/5').expect(200);
		expect(body.user[0].stats).toMatchObject({
			num_films_watched: 3,
			hours_watched: 584,
		});
	});
	test('DELETE 404 /api/users/:user_id/:film_id - non-existent user id', async () => {
		const { body } = await request(app)
			.delete('/api/users/50000/1')
			.expect(404);
		expect(body.msg).toBe('Not Found');
	});
	test('DELETE 404 /api/users/:user_id/:film_id - non-existent film id', async () => {
		const { body } = await request(app)
			.delete('/api/users/5/50000')
			.expect(404);
		expect(body.msg).toBe('Not Found');
	});
	test('DELETE 400 /api/users/:user_id/:film_id - invalid user id', async () => {
		const { body } = await request(app)
			.delete('/api/users/garbage/1')
			.expect(400);
		expect(body.msg).toBe('Bad Request');
	});
	test('DELETE 400 /api/users/:user_id/:film_id - invalid film id', async () => {
		const { body } = await request(app)
			.delete('/api/users/5/garbage')
			.expect(400);
		expect(body.msg).toBe('Bad Request');
	});
});
