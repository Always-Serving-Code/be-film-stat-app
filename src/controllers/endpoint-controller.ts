import endpoints from '../../endpoints.json'
import {  Request, Response} from 'express';

export const getEndpoints = (req: Request, res: Response) => {
    res.status(200).send({ endpoints });
}