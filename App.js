import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import mongoose from "mongoose";
import "dotenv/config";
import UserRoutes from "./Kanbas/Users/routes.js";


const app = express()
app.use(cors()); 
app.use(express.json());
// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req, res) => {
//   res.send('Welcome to Full Stack Development!')})

// const CONNECTION_STRING = "mongodb://127.0.0.1:27017/kanbas"
// mongoose.connect(CONNECTION_STRING);

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING).then(() => console.log("mongodb.connected")).catch((error)=> console.log(error));

Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);
app.listen(4000);
// Hello(app)

// app.listen(process.env.PORT || 4000)