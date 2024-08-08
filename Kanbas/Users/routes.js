import users from "../Database/users.js";
import * as dao from "./dao.js";
let currentUser = null;
// export default function UserRoutes(app) {
//   const createUser = async (req, res) => { };
//   const deleteUser = async (req, res) => { };
//   const findAllUsers = async (req, res) => { };
//   const findUserById = async (req, res) => { };
//   const updateUser = async (req, res) => { };
//   const signup = async (req, res) => { };
//   const signin = async (req, res) => { };
//   const signout = (req, res) => { };
//   const profile = async (req, res) => { };
//   app.post("/api/users", createUser);
//   app.get("/api/users", findAllUsers);
//   app.get("/api/users/:userId", findUserById);
//   app.put("/api/users/:userId", updateUser);
//   app.delete("/api/users/:userId", deleteUser);
//   app.post("/api/users/signup", signup);
//   app.post("/api/users/signin", signin);
//   app.post("/api/users/signout", signout);
//   app.post("/api/users/profile", profile);

export default function UserRoutes(app) {

// find all user
  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users); 
  };
  app.get("/api/users", findAllUsers);

// find user by Id 
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    console.log(req.params.userId)
    console.log(user)
    res.json(user);
  };
  app.get("/api/users/:userId", findUserById);

//  delete user
const deleteUser = async (req, res) => {
  const status = await dao.deleteUser(req.params.userId);
  res.json(status);
};
app.delete("/api/users/:userId", deleteUser);

// update user
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const status = await dao.updateUser(userId, req.body);
  res.json(status);
};
app.put("/api/users/:userId", updateUser);

// create user
const createUser = async (req, res) => {
  const user = await dao.createUser(req.body);
  res.json(user);
};
app.post("/api/users", createUser);


}