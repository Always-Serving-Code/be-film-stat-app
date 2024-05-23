declare global {
	namespace NodeJS {
		interface ProcessEnv {
			ATLAS_URI: string;
			TEST_ATLAS_URI: string;
			DB_NAME: string;
			FILM_COLLECTION: string;
			USERS_COLLECTION: string;
			PORT: number;
		}
	}
}

export {};
