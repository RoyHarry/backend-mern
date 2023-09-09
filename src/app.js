import express from "express";
import bodyParser from "body-parser";
import { router } from "./routers/register.router.js";
import { databaseConnection } from "./database-connection.js";
import cookieParser from "cookie-parser";
import { routerTask } from "./routers/task.router.js";


const app = express();

databaseConnection();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(routerTask);
app.use(router);


console.log("Estoy en el puerto ",3000);
export default app;
