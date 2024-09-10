import express from 'express'
import { usersignup, testUser, usersignin, adminsignup, adminsignin} from '../controllers/auth.controller.js';


const router =express.Router();

router.get("/user", testUser);
router.post("/user/sign-up", usersignup);
router.get("/user/sign-in", usersignin);
router.post("/admin/sign-up", adminsignup);
router.get("/admin/sign-in", adminsignin);

export default router;

