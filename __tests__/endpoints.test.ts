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

describe("/api", () => {
  test("GET /api - responds with endpoints.json", async () => {
    const { body } = await request(app).get("/api").expect(200);
    expect(body.endpoints).toMatchObject({
      "GET /api": {
        description: expect.any(String),
      },
    });
  });
});

describe("/api/users", () => {
  test("GET /api - responds with an array of all users", async () => {
    const { body } = await request(app).get("/api/users").expect(200);
    const { users } = body;
    expect(users.length).toBe(1);
    users.forEach((user: object) => {
      expect(user).toMatchObject({
        _id: expect.any(String),
        username: expect.any(String),
        password: expect.any(String),
        email: expect.any(String),
        films: expect.any(Array),
        stats: expect.any(Object),
      });
    });
  });
});
