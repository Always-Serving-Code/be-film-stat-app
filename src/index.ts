import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import endpoints from '../endpoints.json';
import {addUser} from './controllers/users-controller'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/api', (req: Request, res: Response) => {
	res.status(200).send({ endpoints });
});

app.post('/api/users', addUser)

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
