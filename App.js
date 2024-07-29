import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/Courses/routes.js";

const app = express()
app.use(cors()); 
app.use(express.json());
// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req, res) => {
//   res.send('Welcome to Full Stack Development!')})

Lab5(app)
CourseRoutes(app)
app.listen(4000);
// Hello(app)

// app.listen(process.env.PORT || 4000)