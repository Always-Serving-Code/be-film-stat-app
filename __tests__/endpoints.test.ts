import app from '../src';
import request from 'supertest';

describe('/api', () => {
	test('GET /api - responds with endpoints.json', async () => {
		const { body } = await request(app).get('/api').expect(200);
		console.log(body.endpoints);
		expect(body.endpoints).toMatchObject({
			'GET /api': {
				description: expect.any(String),
			},
		});
	});
});