const express = require("express");
const app = express();
app.use(express.json());
const zod = require("zod");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Angry-Rich:sibugh123@cluster0.igxbluf.mongodb.net/Project-1"
    );
    console.log("DB is Connected...");
  } catch (error) {
    console.log("DB connection is Failed...", error);
  }
};
connectDB().then(() => {
  console.log("D-B is Running...");
});

const schema = mongoose.Schema({
  title: String,
});
const Todo = mongoose.model("Todo", schema);

const typePost = zod.object({
  title: zod.string(),
});

app.post("/post", async (req, res) => {
  const freshTodo = req.body;
  const istrue = typePost.safeParse(freshTodo);

  if (!istrue.success) {
    return res.status(411).send("Please Enter Valid String");
  } else {
    await Todo.create({
      title: freshTodo.title,
    });
    res.status(200).send("Data Saved");
  }
});

app.get("/get", async (req, res) => {
  const allTodo = await Todo.find();
  res.json(allTodo);
});

app.put("/put", async (req, res) => {
  const DeletePayload = req.body;
  const check = typePost.safeParse(DeletePayload);
  if (!check.success) {
    res.status(411).send("Entered data is not valid");
  } else {
    await Todo.deleteOne({ title: DeletePayload.title });
    res.status(200).send("Deleted...");
  }
});

app.listen(3000, () => {
  console.log("Listining...");
});
