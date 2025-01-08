import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {fetchRouteData,DriverAroundLatLong} from "../controllers/rider.controller.js"

const router = Router()


router.route("/RouteData").post(fetchRouteData)
router.route("/DriverAroundLatLong").post(verifyJWT,DriverAroundLatLong)

export default router