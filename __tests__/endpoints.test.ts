import app from "../src";
import request from "supertest";

import seed from "../src/data/seed";
import { dbOpen, dbClose } from "../src/db-connection";

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

describe("/api", () => {
  test("GET 200 /api - responds with endpoints.json", async () => {
    const { body } = await request(app).get("/api").expect(200);
    expect(body.endpoints).toMatchObject({
      "GET /api": {
        description: expect.any(String),
      },
    });
  });
});

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

describe("/api/users/:user_id", () => {
  test("PATCH 200 /api/users/:user_id - responds with an object with an updated user after adding a film", async () => {
    const film = {
      _id: 1,
      title: "The Lord of The Rings: The Fellowship of the Ring",
      directors: "Peter Jackson",
      genres: ["fantasy", "action", "adventure"],
      release_year: 2001,
      synopsis:
        "A Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
      poster_url: "https://m.media-amazon.com/images/I/81abn+94cAL.jpg",
      lead_actors: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
      runtime: 178,
      rating: 5,
      date_watched: "2024-05-22T13:59:41.677Z",
    };
    const { body } = await request(app)
      .patch("/api/users/2")
      .send({ films: film })
      .expect(200);
    const { user } = body;

    expect(user).toMatchObject({
      _id: 2,
      username: "northy",
      password: "titlo22",
      email: "norty22@gmail.com",
      films: [film],
      stats: {
        num_films_watched: 1,
        hours_watched: 178,
      },
    });
  });

  test("PATCH 200 /api/users/:user_id - responds with an object with an updated user with number of films not 0 after adding a film", async () => {
    const film = {
      _id: 1,
      title: "The Lord of The Rings: The Fellowship of the Ring",
      directors: "Peter Jackson",
      genres: ["fantasy", "action", "adventure"],
      release_year: 2001,
      synopsis:
        "A Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
      poster_url: "https://m.media-amazon.com/images/I/81abn+94cAL.jpg",
      lead_actors: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
      runtime: 178,
      rating: 5,
      date_watched: "2024-05-22T13:59:41.677Z",
    };
    const { body } = await request(app)
      .patch("/api/users/5")
      .send({ films: film })
      .expect(200);
    const { user } = body;

    expect(user).toMatchObject({
      _id: 5,
      username: "PumpkinHead",
      password: "watermelon",
      email: "pumpkin@gmail.com",
      films: [film],
      stats: {
        num_films_watched: 5,
        hours_watched: 940,
      },
    });
  });
});
