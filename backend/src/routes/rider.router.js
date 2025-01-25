import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {fetchRouteData,getDriversForRoute,confirmRide} from "../controllers/rider.controller.js"

const router = Router()


router.route("/RouteData").post(fetchRouteData)
router.route("/getDriversForRoute").post(verifyJWT,getDriversForRoute)
router.route("/confirmRide").post(verifyJWT,confirmRide)

export default router