let todos = [ { id: 1, title: "Task 1", completed: false },  { id: 2, title: "Task 2", completed: true },
              { id: 3, title: "Task 3", completed: false },  { id: 4, title: "Task 4", completed: true }, ];
export default function WorkingWithArrays(app) {
    app.get("/lab5/todos/create", (req, res) => {
        const newTodo = {
            id: new Date().getTime(),
            title: "New Task",
            completed: false,
        };
        todos.push(newTodo);
        res.json(todos);
    });

    // New post 
    app.post("/lab5/todos", (req, res) => {
        const newTodo = { ...req.body,  id: new Date().getTime() };
        todos.push(newTodo);
        res.json(newTodo);
      });
    

      app.get("/lab5/todos", (req, res) => {
        console.log("debuging")
        res.json(todos)
      });

    app.get("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        // console.log(id,todo)
        res.json(todo)
    });

    app.get("/lab5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        todos.splice(todoIndex, 1);
        res.json(todos);
    });

    // New delete
    app.delete("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        // todos.splice(todoIndex, 1);
        // res.sendStatus(200);
        if (todoIndex === -1) {
            res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
            return;
          }
      
      });
    
    app.get("/lab5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        console.log(id,title,todo)
        todo.title = title;
        res.json(todos);
      });
    
      app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
        const { id, completed } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.completed = completed;
        res.json(todos);
      });

      app.get("/lab5/todos/:id/description/:description", (req, res) => {
        const { id, description } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.description = description;
        res.json(todos);
      });

      app.put("/lab5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
        if (todoIndex === -1) {
          res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
          return;
        }
        todos = todos.map((t) => {
          if (t.id === parseInt(id)) {
            return { ...t, ...req.body };
          }
          return t;
        });
        res.sendStatus(200);
      });
    






      };
    

    



