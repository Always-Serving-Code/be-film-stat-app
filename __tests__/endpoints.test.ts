import app from "../src";
import request from "supertest";

describe("/api", () => {
  test("GET /api - responds with endpoints.json", async () => {
    const { body } = await request(app).get("/api").expect(200);
    console.log(body.endpoints);
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
