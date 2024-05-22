"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = __importDefault(require("../src"));
const supertest_1 = __importDefault(require("supertest"));
const seed_1 = __importDefault(require("../src/data/seed"));
const db_connection_1 = require("../src/db-connection");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_connection_1.dbOpen)();
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, seed_1.default)();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_connection_1.dbClose)();
}));
describe('404 General Not Found Error', () => {
    test('404: When path does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(src_1.default).get('/api/incorrect-path').expect(404);
        expect(body.msg).toBe('Not Found');
    }));
});
describe('/api', () => {
    test('GET /api - responds with endpoints.json', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(src_1.default).get('/api').expect(200);
        expect(body.endpoints).toMatchObject({
            'GET /api': {
                description: expect.any(String),
            },
        });
    }));
});
describe('/api/users', () => {
    test('GET /api - responds with an array of all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(src_1.default).get('/api/users').expect(200);
        const { users } = body;
        expect(users.length).toBe(5);
        users.forEach((user) => {
            expect(user).toMatchObject({
                _id: expect.any(Number),
                username: expect.any(String),
                password: expect.any(String),
                email: expect.any(String),
                films: expect.any(Array),
                stats: expect.any(Object),
            });
        });
    }));
});
describe('/api/users/:user_id', () => {
    test('GET 200/api/users/:user_id - responds with an object of user associated with the user id', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(src_1.default).get('/api/users/2').expect(200);
        const { user } = body;
        expect(user[0]).toMatchObject({
            _id: 2,
            username: 'northy',
            password: 'titlo22',
            email: 'norty22@gmail.com',
            films: [{}],
            stats: {
                num_films_watched: 0,
                hours_watched: 0,
            },
        });
    }));
    test('GET 400 /api/users/:user_id - responds with an error message when passed an invalid id', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(src_1.default).get('/api/users/cat').expect(400);
        const { msg } = body;
        expect(msg).toBe('Bad Request');
    }));
    test('GET 404 /api/users/:user_id - responds with an error message when passed an id that does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(src_1.default).get('/api/users/200').expect(404);
        const { msg } = body;
        expect(msg).toBe('Not Found');
    }));
});
describe('/api/users/:userId/films', () => {
    test('GET 200 /api/users/:user_id/films', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(src_1.default).get('/api/users/5/films').expect(200);
        const { films } = body;
        expect(films.length).toBe(4);
        films.forEach((film) => {
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
    }));
    test('GET 404 /api/users/:user_id/films - user id not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(src_1.default)
            .get('/api/users/6000/films')
            .expect(404);
        expect(body.msg).toBe('Not Found');
    }));
    test('GET 404 /api/users/:user_id/films - user exists but no associated films', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(src_1.default).get('/api/users/1/films').expect(404);
        expect(body.msg).toBe('No Films Added Yet!');
    }));
    test('GET 400 /api/users/:user_id/films - invalid user id', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(src_1.default)
            .get('/api/users/garbage/films')
            .expect(400);
        expect(body.msg).toBe('Bad Request');
    }));
});
describe('/api/films', () => {
    test('GET /api/films - responds with an array of all films', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(src_1.default).get('/api/films').expect(200);
        const { films } = body;
        expect(films.length).toBe(30);
        films.forEach((film) => {
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
    }));
});
//stats are updated
//404 X 2 - one for each
//400 x 2 - one for each
describe.only('/api/users/:user_id/:film_id', () => {
    test('DELETE 204 /api/users/:user_id/:film_id - removes an existing film from the users history', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.default).delete('/api/users/5/1').expect(204);
    }));
    test('DELETE 204 /api/users/:user_id/:film_id - stats associated with the user are updated', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.default).delete('/api/users/5/1').expect(204);
        const { body } = yield (0, supertest_1.default)(src_1.default).get('/api/users/5').expect(200);
        expect(body.user[0].stats).toMatchObject({
            num_films_watched: 3,
            hours_watched: 584,
        });
    }));
    test('DELETE 404 /api/users/:user_id/:film_id - non-existent user id', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(src_1.default)
            .delete('/api/users/50000/1')
            .expect(404);
        expect(body.msg).toBe('Not Found');
    }));
    test('DELETE 404 /api/users/:user_id/:film_id - non-existent film id', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(src_1.default)
            .delete('/api/users/5/50000')
            .expect(404);
        expect(body.msg).toBe('Not Found');
    }));
    test('DELETE 400 /api/users/:user_id/:film_id - invalid user id', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(src_1.default)
            .delete('/api/users/garbage/1')
            .expect(400);
        expect(body.msg).toBe('Bad Request');
    }));
    test('DELETE 400 /api/users/:user_id/:film_id - invalid film id', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = yield (0, supertest_1.default)(src_1.default)
            .delete('/api/users/5/garbage')
            .expect(400);
        expect(body.msg).toBe('Bad Request');
    }));
});
