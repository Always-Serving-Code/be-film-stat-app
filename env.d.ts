declare global {
    namespace NodeJS {
        interface ProcessEnv {
            ATLAS_URI: string;
            DB_NAME: string;
            USERS_COLLECTION: string;
            PORT: number

        }
    }
}

export {}