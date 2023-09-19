import express from "express"
import { createUser, signInUser, verifyUser, getAllUser } from "../controller/authController"

const router = express.Router()

router.route("/").get(getAllUser)
router.route("/register").post(createUser)
router.route("/sign-in").post(signInUser)
router.route("/:userID/verified").get(verifyUser)

export default router;


