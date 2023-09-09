import { Router } from "express";
import { registerTask } from "../controllers/task.controller.js";
import { validateToken } from '../middleware/authenticationValidate.js';


export const routerTask = Router();


routerTask.post('/registerTask', validateToken , registerTask);
