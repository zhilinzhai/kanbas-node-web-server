import PathParameters from "./PathParameters.js";
import QueryParameters from "./QueryParameters.js";
import WorkingWithArrays from "./WorkingWithArrays.js";
import WorkingWithObjects from "./WorkingWithObjects.js";
export default function Lab5(app) {
  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5");
  });
  app.get("/lab5/assignment/title", (req, res) => {
    res.json(assignment.title);
  });

  PathParameters(app);
  QueryParameters(app);
  WorkingWithArrays(app);
  WorkingWithObjects(app);
}


