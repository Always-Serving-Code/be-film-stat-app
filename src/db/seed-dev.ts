import seed from "./seed";
import filmData from "../data/dev-data/film-data.json";
import userData from "../data/dev-data/user-data.json";

const seedDev = async (filmData: object[], userData: object[]) => {
	try {
		await seed(filmData, userData);
	} catch {
		console.log("unable to seed dev data");
	}
};

seedDev(filmData, userData);
