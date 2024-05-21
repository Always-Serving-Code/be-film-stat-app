import app from "../src";
import request from "supertest";

import seed from "../src/data/seed";
import { dbOpen, dbClose } from "../src/db-connection";
import { IncomingMessage } from "http";
import { response } from "express";

beforeAll(async () => {
  await dbOpen();
});
beforeEach(async () => {
  await seed();
});
afterAll(async () => {
  await dbClose();
});

describe("404 General Not Found Error", () => {
  test("404: When path does not exist", () => {
    return request(app)
      .get("/api/incorrect-path")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

// describe("/api", () => {
//   test("GET 200 /api - responds with endpoints.json", async () => {
//     const { body } = await request(app).get("/api").expect(200);
//     expect(body.endpoints).toMatchObject({
//       "GET /api": {
//         description: expect.any(String),
//       },
//     });
//   });
// });

describe("/api/users", () => {
  test("GET 200 /api/users - responds with an array of all users", async () => {
    const { body } = await request(app).get("/api/users").expect(200);
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

describe("/api/users/:user_id", () => {
  test("GET 200/api/users/:user_id - responds with an object of user associated with the user id", async () => {
    const { body } = await request(app).get("/api/users/2").expect(200);
    const { user } = body;
    expect(user[0]).toMatchObject({
      _id: 2,
      username: "northy",
      password: "titlo22",
      email: "norty22@gmail.com",
      films: [{}],
      stats: {
        num_films_watched: 0,
        hours_watched: 0,
      },
    });
  });
  test("GET 400 /api/users/:user_id - responds with an error message when passed an invalid id", async () => {
    const { body } = await request(app).get("/api/users/cat").expect(400);
    const { msg } = body;
    expect(msg).toBe("Bad Request");
  });
  test("GET 404 /api/users/:user_id - responds with an error message when passed an id that does not exist", async () => {
    const { body } = await request(app).get("/api/users/200").expect(404);
    const { msg } = body;
    console.log(msg);
    expect(msg).toBe("Not Found");
  });
});

describe("/api/films", () => {
  test("GET /api - responds with an array of all films", async () => {
    const { body } = await request(app).get("/api/films").expect(200);
    const { films } = body;
    expect(films.length).toBe(30);
    films.forEach((film: object) => {
      expect(film).toMatchObject({
        _id: expect.any(String),
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
