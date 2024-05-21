import { getEndpoints } from "../controllers/endpoint-controller"
import express from "express"

const apiRouter = express.Router()


apiRouter.route("/").get(getEndpoints)

export default apiRouter