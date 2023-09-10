import { Router } from "express";
import { getTasks, registerTask, getTask, deleteTask, updateTask } from "../controllers/task.controller.js";
import { validateToken } from '../middleware/authenticationValidate.js';


export const routerTask = Router();


routerTask.post('/task', validateToken , registerTask);
routerTask.get('/task', validateToken, getTasks);
routerTask.get('/task/:id', validateToken, getTask);
routerTask.delete('/task/:id', validateToken, deleteTask);
routerTask.put('/task/:id', validateToken, updateTask)