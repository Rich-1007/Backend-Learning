const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gamil.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  let isTrue = false;
  ALL_USERS.find((item) => {
    if (item.username == username && item.password == password) {
      isTrue = true;
    } else {
      istrue = false;
    }
  });

  return isTrue;
}

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!userExists(username, password)) {
    res.status(403).json({
      msg: "User Doesn't Exist",
    });
  } else {
    var token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
      token,
    });
  }
});

app.get("/users", (req, res) => {
  const token = req.headers.authorization;
  console.log("token", token)
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    res.send(username)
  } catch (err) {
    res.status(403).json({
      msg: "Invaid Token",
    });
  }
});

app.listen(3000, () => {
  console.log("Chuard");
});
