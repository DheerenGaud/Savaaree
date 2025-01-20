import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {fetchRouteData,getDriverForRoute} from "../controllers/rider.controller.js"

const router = Router()


router.route("/RouteData").post(fetchRouteData)
router.route("/getDriverForRoute").post(verifyJWT,getDriverForRoute)

export default router