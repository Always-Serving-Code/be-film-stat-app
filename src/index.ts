import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';
import apiRouter from './routes/api-router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use("/api", apiRouter)

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
