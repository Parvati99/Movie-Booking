import express from 'express'
import { signup, testUser, signin} from '../controllers/auth.controller.js';


const router =express.Router();

router.get("/user", testUser);
router.post("/sign-up", signup);
router.get("/sign-in", signin)

export default router;

