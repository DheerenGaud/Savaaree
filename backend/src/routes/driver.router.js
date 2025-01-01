import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {updateLocation} from "../controllers/driver.controller.js"

const router = Router()


router.route("/addDocuments").post(verifyJWT)
router.route("/updateLocation").post(verifyJWT,updateLocation);

export default router