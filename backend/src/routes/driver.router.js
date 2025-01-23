import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {updateLocation,updateDocument, addVehicle} from "../controllers/driver.controller.js"

import { upload } from "../middlewares/multer.middleware.js";

const router = Router()


router.route("/addDocuments").post(verifyJWT)
router.route("/updateLocation").post(verifyJWT,updateLocation);
router.route("/updateDocument").post(verifyJWT,upload.single("driverPhoto"),updateDocument);
router.route("/addVehicle").post(verifyJWT, upload.array("vehiclePhotos", 5), addVehicle); // Limit to 5 files


export default router