import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());

const users = [
  { firstName: "Harry", lastName: "Potter" },
  { firstName: "Ronald", lastName: "Bilius Weasley" },
  { firstName: "Hermione", lastName: "Jean Granger" },
  { firstName: "Draco", lastName: "Malfoy" },
  { firstName: "Cedric", lastName: "Diggory" },
  { firstName: "Luna", lastName: "Lovegood" },
];

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= users.length) {
    return res.json({});
  }
  res.json(users[id]);
});

app.post("/users", (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return res.json({ message: "Missing dat" });
  }
  const newUser = { firstName, lastName };
  users.push(newUser);
  res.json(newUser);
});

app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= users.length) {
    return res.json({ message: "User not found" });
  }
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return res.json({ message: "Missing dat" });
  }
  users[id] = { firstName, lastName };
  res.json(users[id]);
});

app.patch("/users/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= users.length) {
    return res.json({ message: "User not found" });
  }
  const { firstName, lastName } = req.body;
  users[id] = {
    firstName: firstName || users[id].firstName,
    lastName: lastName || users[id].lastName,
  };
  res.json(users[id]);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= users.length) {
    return res.json({ message: "User not found" });
  }
  users.splice(id, 1);
  res.json({ message: "Delet suc" });
});

app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});
