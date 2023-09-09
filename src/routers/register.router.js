import { Router } from "express";
import { registerUser, login, logout, myProfile } from "../controllers/register.controller.js";
import { validateToken } from "../middleware/authenticationValidate.js";


export const router = Router();

router.post("/registerUser", registerUser);
router.post("/login", login);
router.post("/logout", logout);
router.post("/myProfile", validateToken , myProfile);