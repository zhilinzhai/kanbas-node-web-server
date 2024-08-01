import db from "../Database/index.js";
export default function AssignmentRoutes(app) {

app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
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
    const { cid } = req.params;  // Get the course ID from the URL path parameter
    const assignments = db.assignments.filter(assignment => assignment.course === cid);  // Filter modules by course ID
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
    res.sendStatus(204);
  });
}