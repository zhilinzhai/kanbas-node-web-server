import users from "../Database/users.js";
import * as userController from "./dao.js";
let currentUser = null;

export default function UserRoutes(app) {
  const createUser = async (req, res) => { 
    const user = await userController.createUser(req.body);
    res.json(user);
  };
  const deleteUser = async (req, res) => {       
    const status = await userController.deleteUser(req.params.userId);
    res.json(status);
  };
  const findAllUsers = async (req, res) => { 
    const { role, name } = req.query;
    if (role) {
      const users = await userController.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await userController.findUsersByPartialName(name);
      res.json(users);
      return;
    }
  
    const users = await userController.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => {
    const user = await userController.findUserById(req.params.userId);
    res.json(user);
  };
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await userController.updateUser(userId, req.body);
    res.json(status);
  };

  const signup = async (req, res) => {
    const user = await userController.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
      return;
    }
    const currentUser = await userController.createUser(req.body);
    console.log("HEELL ",currentUser);
    req.session["currentUser"] = currentUser;
    console.log(req.session);
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await userController.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Username or Password is incorrect." });
    }
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  const profile = async (req, res) => {
    console.log(req.session);
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
} 
