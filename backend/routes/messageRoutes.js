import express from 'express'
import { sendMessage } from '../controllers/messageController'

const router = express.Router()

router.post("/send/:id", sendMessage)
router.get()

export default router