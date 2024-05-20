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
    console.log(body);
    const { users } = body;
    expect(users.length).toBe(1);
    users.forEach((user: object) => {
      expect(user).toMatchObject({
        username: String,
        password: String,
        email: String,
        films: Array,
        stats: Object,
      });
    });
  });
});
