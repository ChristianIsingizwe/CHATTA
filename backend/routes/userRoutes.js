import express from 'express'
import { findUser, findUsers, registerUser, signInUser } from '../controllers/userController.js'

const router = express.Router()


router.post("/register", registerUser)
router.post("/signIn", signInUser)
router.get("/users", findUsers)
router.get("/user/:id", findUser)


export default router