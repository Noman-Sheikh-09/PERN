const express = require("express");
const app = express();
const cors = require("cors");
const client = require("./database");
const PORT = 6000;
// MiddleWare
app.use(cors());
app.use(express.json());

// Routes

client.connect(() => {
  console.log("connected with Database");
});

app.post("/addStudent", async (req, res) => {
  try {
    const { name } = req.body;
    const newStudent = await client.query(
      "INSERT INTO students ( name) VALUES($1) RETURNING *",
      [name]
    );
    res.json(newStudent.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/getStudents", async (req, res) => {
  try {
    const allStudents = await client.query("SELECT * FROM students");
    res.json(allStudents.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log("Server is Runnning");
});
