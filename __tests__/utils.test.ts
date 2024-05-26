import { objectArrayToBeSortedBy } from "./test-utils";
import { sortAndOrderObjArr } from "../src/utils";

describe("sortAndOrderObjArr", () => {
	const input = [
		{
			_id: 4,
			title: "midsommar",
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
			date_watched: "2024-02-21T13:59:41.677Z",
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
			date_watched: "2024-03-21T13:59:41.677Z",
		},
		{
			_id: 2,
			title: "the Lord of The Rings: The Two Towers",
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
			date_watched: "2024-04-21T13:59:41.677Z",
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
			rating: 4,
			date_watched: "2024-05-21T13:59:41.677Z",
		},
	];

	test("returns an array", () => {
		expect(sortAndOrderObjArr([])).toEqual([]);
	});
	test("returns an array of objects sorted by date_watched in descending order by default", () => {
		const sorted = sortAndOrderObjArr(input);
		expect(objectArrayToBeSortedBy(sorted, "date_watched", "desc")).toBe(true);
	});
	test("returns an array of objects sorted by specified key (ignoring case if string) in descending sort by default", () => {
		const sortedRuntime = sortAndOrderObjArr(input, "runtime");
		const sortedTitle = sortAndOrderObjArr(input, "title");

		expect(objectArrayToBeSortedBy(sortedRuntime, "runtime", "desc")).toBe(
			true
		);
		expect(objectArrayToBeSortedBy(sortedTitle, "runtime", "desc")).toBe(true);
	});
	test("returns an array of objects sorted by specified key in specified order", () => {
		const sortedDateAsc = sortAndOrderObjArr(input, "date_watched", "asc");
		const sortedRuntimeAsc = sortAndOrderObjArr(input, "runtime", "asc");
		const sortedRuntimeDesc = sortAndOrderObjArr(input, "runtime", "desc");
		const sortedRatingAsc = sortAndOrderObjArr(input, "rating", "asc");
		const sortedRatingDesc = sortAndOrderObjArr(input, "rating", "desc");
		const sortedTitleAsc = sortAndOrderObjArr(input, "title", "asc");
		const sortedTitleDesc = sortAndOrderObjArr(input, "title", "desc");

		expect(objectArrayToBeSortedBy(sortedDateAsc, "date_watched", "asc")).toBe(
			true
		);
		expect(objectArrayToBeSortedBy(sortedRuntimeAsc, "runtime", "asc")).toBe(
			true
		);
		expect(objectArrayToBeSortedBy(sortedRuntimeDesc, "runtime", "desc")).toBe(
			true
		);
		expect(objectArrayToBeSortedBy(sortedRatingAsc, "rating", "asc")).toBe(
			true
		);
		expect(objectArrayToBeSortedBy(sortedRatingDesc, "rating", "desc")).toBe(
			true
		);
		expect(objectArrayToBeSortedBy(sortedTitleAsc, "title", "asc")).toBe(true);
		expect(objectArrayToBeSortedBy(sortedTitleDesc, "title", "desc")).toBe(
			true
		);
	});
});

describe("objectArrayToBeSortedBy", () => {
	const orderedByRuntimeDesc = [
		{ title: "a", runtime: 100 },
		{ title: "e", runtime: 99 },
		{ title: "c", runtime: 98 },
		{ title: "d", runtime: 97 },
		{ title: "b", runtime: 96 },
	];

	const orderedByRuntimeAsc = [
		{ title: "b", runtime: 96 },
		{ title: "d", runtime: 97 },
		{ title: "c", runtime: 98 },
		{ title: "e", runtime: 99 },
		{ title: "a", runtime: 100 },
	];

	const orderedByTitleAsc = [
		{ title: "a", runtime: 96 },
		{ title: "b", runtime: 99 },
		{ title: "C", runtime: 97 },
		{ title: "d", runtime: 100 },
		{ title: "E", runtime: 98 },
	];

	const orderedByTitleDesc = [
		{ title: "e", runtime: 98 },
		{ title: "d", runtime: 100 },
		{ title: "c", runtime: 97 },
		{ title: "b", runtime: 99 },
		{ title: "a", runtime: 96 },
	];

	test("returns true when passed an array of objects sorted by a key containing numbers in descending order", () => {
		expect(
			objectArrayToBeSortedBy(orderedByRuntimeDesc, "runtime", "desc")
		).toBe(true);
	});
	test("returns true when passed an array of objects sorted by a key containing numbers in ascending order", () => {
		expect(
			objectArrayToBeSortedBy(orderedByRuntimeAsc, "runtime", "asc")
		).toBe(true);
	});
	test("returns false when passed an array of objects NOT sorted by a key containing numbers in descending order", () => {
		expect(objectArrayToBeSortedBy(orderedByTitleAsc, "runtime", "desc")).toBe(
			false
		);
	});
	test("returns false when passed an array of objects NOT sorted by a key containing numbers in ascending order", () => {
		expect(objectArrayToBeSortedBy(orderedByTitleAsc, "runtime", "asc")).toBe(
			false
		);
	});
	test("returns true when passed an array of objects sorted by a key containing strings in descending order", () => {
		expect(objectArrayToBeSortedBy(orderedByTitleDesc, "title", "desc")).toBe(
			true
		);
	});
	test("returns true when passed an array of objects sorted by a key containing strings in ascending order", () => {
		expect(objectArrayToBeSortedBy(orderedByTitleAsc, "title", "asc")).toBe(
			true
		);
	});
	test("returns false when passed an array of objects NOT sorted by a key containing strings in descending order", () => {
		expect(objectArrayToBeSortedBy(orderedByRuntimeAsc, "title", "desc")).toBe(
			false
		);
	});
	test("returns false when passed an array of objects NOT sorted by a key containing strings in ascending order", () => {
		expect(objectArrayToBeSortedBy(orderedByRuntimeAsc, "title", "asc")).toBe(
			false
		);
	});
});
