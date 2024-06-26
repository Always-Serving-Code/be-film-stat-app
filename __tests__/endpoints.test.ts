import app from "..";
import request from "supertest";
import { dbOpen } from "../src/db/db-connection";
import seed from "../src/db/seed";
import filmData from "../src/data/test-data/film-data.json";
import userData from "../src/data/test-data/user-data.json";
import { objectArrayToBeSortedBy } from "./test-utils";

beforeAll(async () => {
	await dbOpen();
});
afterEach(async () => {
	await seed(filmData, userData);
});

describe("General Errors", () => {
	test("404: When path does not exist", async () => {
		const { body } = await request(app).get("/api/incorrect-path").expect(404);
		expect(body.msg).toBe("Not Found");
	});
});

describe("GET /api", () => {
	test("GET 200 /api - responds with endpoints.json", async () => {
		const { body } = await request(app).get("/api").expect(200);
		expect(body.endpoints).toMatchObject({
			"GET /api": {
				description: expect.any(String),
			},
		});
	});
});

describe("GET /api/users", () => {
	test("GET 200 /api/users  - responds with an array of all users", async () => {
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
			});
		});
	});
});

describe("GET /api/users/:user_id", () => {
	test("GET 200 /api/users/:user_id - responds with an object of user associated with the user id", async () => {
		const { body } = await request(app).get("/api/users/2").expect(200);
		const { user } = body;
		expect(user).toMatchObject({
			_id: 2,
			username: "northy",
			password: "titlo22",
			email: "norty22@gmail.com",
			films: [],
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

describe("GET /api/users/:userId/films", () => {
	test("GET 200 /api/users/:user_id/films - respond with an array of films associated with user id", async () => {
		const { body } = await request(app).get("/api/users/5/films").expect(200);
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
	test("GET 404 /api/users/:user_id/films - user id not found", async () => {
		const { body } = await request(app)
			.get("/api/users/6000/films")
			.expect(404);
		expect(body.msg).toBe("Not Found");
	});
	test("GET 404 /api/users/:user_id/films - user exists but no associated films", async () => {
		const { body } = await request(app).get("/api/users/1/films").expect(404);
		expect(body.msg).toBe("No Films Added Yet!");
	});
	test("GET 400 /api/users/:user_id/films - invalid user id", async () => {
		const { body } = await request(app)
			.get("/api/users/garbage/films")
			.expect(400);
		expect(body.msg).toBe("Bad Request");
	});
});

describe("GET /api/users/:user_id/films? queries", () => {
	describe("GET /api/users/:user_id/films?sort_by", () => {
		test("GET 200 /api/users/:user_id/films - responds with a list of films sorted by date_watched in descending order by default", async () => {
			const { body } = await request(app).get("/api/users/5/films").expect(200);
			const { films } = body;
			expect(objectArrayToBeSortedBy(films, "date_watched", "desc")).toBe(true);
		});

		test("GET 200 /api/users/:user_id/films?sort_by=rating - responds with a list of films sorted by rating in descending order by default", async () => {
			const { body } = await request(app)
				.get("/api/users/5/films?sort_by=rating")
				.expect(200);
			const { films } = body;
			expect(objectArrayToBeSortedBy(films, "rating", "desc")).toBe(true);
		});
		test("GET 200 /api/users/:user_id/films?sort_by=title - responds with a list of films sorted by rating in descending order by default", async () => {
			const { body } = await request(app)
				.get("/api/users/5/films?sort_by=title")
				.expect(200);
			const { films } = body;
			expect(objectArrayToBeSortedBy(films, "title", "desc")).toBe(true);
		});
		test("GET 200 /api/users/:user_id/films?sort_by=release_year - responds with a list of films sorted by rating in descending order by default", async () => {
			const { body } = await request(app)
				.get("/api/users/5/films?sort_by=release_year")
				.expect(200);
			const { films } = body;
			expect(objectArrayToBeSortedBy(films, "release_year", "desc")).toBe(true);
		});
		test("GET 200 /api/users/:user_id/films?sort_by=runtime - responds with a list of films sorted by rating in descending order by default", async () => {
			const { body } = await request(app)
				.get("/api/users/5/films?sort_by=runtime")
				.expect(200);
			const { films } = body;
			expect(objectArrayToBeSortedBy(films, "runtime", "desc")).toBe(true);
		});
		test("GET 400 /api/users/:user_id/films?sort_by=garbage - responds with a 400 when given an invalid query param", async () => {
			const { body } = await request(app)
				.get("/api/users/5/films?sort_by=garbage")
				.expect(400);
			expect(body.msg).toBe("Bad Request");
		});
	});

	describe("GET /api/users/:user_id/films?order", () => {
		test("GET 200 /api/users/:user_id/films?order=asc - orders the results in ascending order", async () => {
			const { body } = await request(app)
				.get("/api/users/5/films?order=asc")
				.expect(200);
			const { films } = body;
			expect(objectArrayToBeSortedBy(films, "date_watched", "asc")).toBe(true);
		});
		test("GET 400 /api/users.:user_id/films?order=garbage - responds with a 400 error if invalid order value given", async () => {
			const { body } = await request(app)
				.get("/api/users/5/films?garbage=garbage")
				.expect(400);
			expect(body.msg).toBe("Bad Request");
		});
	});
	test("GET 200 /api/users/:user_if/films?sort_by=*&order=* - correctly returns with chained queries", async () => {
		const { body } = await request(app)
			.get("/api/users/5/films?sort_by=rating&order=asc")
			.expect(200);
		const { films } = body;
		expect(objectArrayToBeSortedBy(films, "rating", "asc")).toBe(true);
	});
	test("GET 400 /api/users/:user_if/films?garbage=garbage - responds with a 400 error if invalid query", async () => {
		const { body } = await request(app)
			.get("/api/users/5/films?garbage=garbage")
			.expect(400);
		expect(body.msg).toBe("Bad Request");
	});
});

describe("GET /api/films", () => {
	test("GET 200 /api/films - responds with an array of all films", async () => {
		const { body } = await request(app).get("/api/films").expect(200);
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

describe("GET /api/films/:film_id", () => {
	test("GET 200 /api/films/:film_id - responds with the film with the associated id", async () => {
		const { body } = await request(app).get("/api/films/2").expect(200);
		const { film } = body;
		expect(film).toMatchObject({
			_id: 2,
			title: "The Lord of The Rings: The Two Towers",
			directors: ["Peter Jackson"],
			genres: ["fantasy", "action", "adventure"],
			release_year: 2002,
			synopsis:
				"While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
			poster_url:
				"https://artofthemovies.co.uk/cdn/shop/products/lord_of_the_rings_the_two_towers_NG06275_B_2_framed1-423634.jpg?v=1611688137",
			lead_actors: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
			runtime: 235,
		});
	});
	test("GET 404 /api/films/:film_id - responds with an error for non-existent id", async () => {
		const { body } = await request(app).get("/api/films/50000").expect(404);
		expect(body.msg).toBe("Not Found");
	});
	test("GET 400 /api/films/:film_id - responds with an error for invalid id", async () => {
		const { body } = await request(app).get("/api/films/garbage").expect(400);
		expect(body.msg).toBe("Bad Request");
	});
});

describe.only("DELETE /api/users/:user_id/:film_id", () => {
	test("DELETE 204 /api/users/:user_id/:film_id - removes an existing film from the users history", async () => {
		await request(app).delete("/api/users/5/1").expect(204);
	});
	test("DELETE 404 /api/users/:user_id/:film_id - non-existent user id", async () => {
		const { body } = await request(app)
			.delete("/api/users/50000/1")
			.expect(404);
		expect(body.msg).toBe("Not Found");
	});
	test("DELETE 404 /api/users/:user_id/:film_id - non-existent film id", async () => {
		const { body } = await request(app)
			.delete("/api/users/5/50000")
			.expect(404);
		expect(body.msg).toBe("Not Found");
	});
	test("DELETE 400 /api/users/:user_id/:film_id - invalid user id", async () => {
		const { body } = await request(app)
			.delete("/api/users/garbage/1")
			.expect(400);
		expect(body.msg).toBe("Bad Request");
	});
	test("DELETE 400 /api/users/:user_id/:film_id - invalid film id", async () => {
		const { body } = await request(app)
			.delete("/api/users/5/garbage")
			.expect(400);
		expect(body.msg).toBe("Bad Request");
	});
});

describe("PATCH /api/users/:user_id", () => {
	test("PATCH 200 /api/users/:user_id - responds with an object with an updated user after adding a film", async () => {
		const patch = {
			film_id: 1,
			date_watched: new Date("07-24-2023"),
			rating: 5,
		};
		const { body } = await request(app)
			.patch("/api/users/2")
			.send(patch)
			.expect(200);
		const { user } = body;
		expect(user).toMatchObject({
			_id: 2,
			username: "northy",
			password: "titlo22",
			email: "norty22@gmail.com",
			films: [
				{
					_id: 1,
					title: "The Lord of The Rings: The Fellowship of the Ring",
					directors: ["Peter Jackson"],
					genres: ["fantasy", "action", "adventure"],
					release_year: 2001,
					synopsis:
						"A Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
					poster_url: "https://m.media-amazon.com/images/I/81abn+94cAL.jpg",
					lead_actors: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
					runtime: 178,
					rating: 5,
					date_watched: expect.any(String),
				},
			],
		});
	});

	test("PATCH 200 /api/users/:user_id - responds with an object with an updated user with number of films not 0 after adding a film", async () => {
		const patch = {
			film_id: 1,
			date_watched: new Date("07-24-2023"),
			rating: 5,
		};

		const { body } = await request(app)
			.patch("/api/users/5")
			.send(patch)
			.expect(200);
		const { user } = body;
		expect(user).toMatchObject({
			_id: 5,
			username: "PumpkinHead",
			password: "watermelon",
			email: "pumpkin@gmail.com",
			films: [
				{
					_id: 1,
					title: "The Lord of The Rings: The Fellowship of the Ring",
					directors: ["Peter Jackson"],
					genres: ["fantasy", "action", "adventure"],
					release_year: 2001,
					synopsis:
						"A Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
					poster_url: "https://m.media-amazon.com/images/I/81abn+94cAL.jpg",
					lead_actors: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
					runtime: 178,
					rating: 4,
					date_watched: expect.any(String),
				},
				{
					_id: 2,
					title: "The Lord of The Rings: The Two Towers",
					directors: ["Peter Jackson"],
					genres: ["fantasy", "action", "adventure"],
					release_year: 2002,
					synopsis:
						"While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
					poster_url:
						"https://artofthemovies.co.uk/cdn/shop/products/lord_of_the_rings_the_two_towers_NG06275_B_2_framed1-423634.jpg?v=1611688137",
					lead_actors: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
					runtime: 235,
					rating: 5,
					date_watched: expect.any(String),
				},
				{
					_id: 3,
					title: "The Lord of The Rings: The Return of the King",
					directors: ["Peter Jackson"],
					genres: ["fantasy", "action", "adventure"],
					release_year: 2003,
					synopsis:
						"Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
					poster_url:
						"https://static.posters.cz/image/1300/posters/the-lord-of-the-rings-the-return-of-the-king-i104633.jpg",
					lead_actors: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
					runtime: 201,
					rating: 5,
					date_watched: expect.any(String),
				},
				{
					_id: 4,
					title: "Midsommar",
					directors: ["Ari Aster"],
					genres: ["drama", "horror", "mystery"],
					release_year: 2019,
					synopsis:
						"A couple travels to Northern Europe to visit a rural hometown's fabled Swedish mid-summer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult.",
					poster_url:
						"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKk36ZSsCK9NVLN-H10vITUFK33gfpBeYenRQ8wF3sww&s",
					lead_actors: ["Florence Pugh", "Jack Reynor"],
					runtime: 148,
					rating: 2,
					date_watched: expect.any(String),
				},
				{
					_id: 1,
					title: "The Lord of The Rings: The Fellowship of the Ring",
					directors: ["Peter Jackson"],
					genres: ["fantasy", "action", "adventure"],
					release_year: 2001,
					synopsis:
						"A Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
					poster_url: "https://m.media-amazon.com/images/I/81abn+94cAL.jpg",
					lead_actors: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
					runtime: 178,
					rating: 5,
					date_watched: expect.any(String),
				},
			],
		});
	});
	test("PATCH 400 /api/users/:user_id - user id is invalid", async () => {
		const patch = {
			film_id: 1,
			date_watched: new Date("07-24-2023"),
			rating: 5,
		};
		const { body } = await request(app)
			.patch("/api/users/dog")
			.expect(400)
			.send(patch);
		expect(body.msg).toBe("Bad Request");
	});
	test("PATCH 404 /api/users/:user_id - user id is not found", async () => {
		const patch = {
			film_id: 1,
			date_watched: new Date("07-24-2023"),
			rating: 5,
		};
		const { body } = await request(app)
			.patch("/api/users/2000")
			.expect(404)
			.send(patch);
		expect(body.msg).toBe("Not Found");
	});
});
