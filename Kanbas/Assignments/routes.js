import assignments from "../Database/assignments.js";
import db from "../Database/index.js";
export default function AssignmentRoutes(app) {

app.post("/api/courses/:cid/assignments", (req, res) => {
    const { aid } = req.params;
    const newAssignment = {
      ...req.body,
      course: aid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.push(newAssignment);
    res.send(newAssignment);
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    db.assignments = db.assignments.filter((a) => a._id !== aid);
    res.sendStatus(204);
  });

  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { aid } = req.params;  // Get the course ID from the URL path parameter
    const assignments = db.assignments.filter(assignment => module.assignments === aid);  // Filter modules by course ID
    res.send(assignments);  // Respond with the filtered modules
});

app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentIndex = db.assignments.findIndex(
      (a) => a._id === aid);
    console.log(db.assignments[assignmentIndex] )
    db.assignments[assignmentIndex] = {
      ...db.assignments[assignmentIndex],
      ...req.body
    };
    console.log(db.assignments[assignmentndex] )
    res.sendStatus(204);
  });



}