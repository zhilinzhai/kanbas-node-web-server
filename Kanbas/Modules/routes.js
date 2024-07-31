import db from "../Database/index.js";
export default function ModuleRoutes(app) {
//   app.get("/api/courses/:cid/modules", (req, res) => {
//     const { cid } = req.params;
//     const modules = db.modules.filter((m) => m.course === cid);
//     res.json(modules);
//   });
app.post("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const newModule = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.modules.push(newModule);
    res.send(newModule);
  });
  

app.delete("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    db.modules = db.modules.filter((m) => m._id !== mid);
    res.sendStatus(204);
  });

  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;  // Get the course ID from the URL path parameter
    const modules = db.modules.filter(module => module.course === cid);  // Filter modules by course ID
    res.send(modules);  // Respond with the filtered modules
});

app.put("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    const moduleIndex = db.modules.findIndex(
      (m) => m._id === mid);
    console.log(db.modules[moduleIndex] )
    db.modules[moduleIndex] = {
      ...db.modules[moduleIndex],
      ...req.body
    };
    console.log(db.modules[moduleIndex] )
    res.sendStatus(204);
  });



  app.post("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;  
    const newModule = {
      ...req.body,               
      course: cid,               
      _id: new Date().getTime().toString(),  
    };
    db.modules.push(newModule);  
    res.status(201).send(newModule);  
  });
 


}
