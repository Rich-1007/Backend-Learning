const mongoose = require("mongoose");

const mongoURL =
    "mongodb+srv://ghricheak:sibugh123@cluster0.xcuaoah.mongodb.net/Employee";

const db = mongoose.connection;

db.on("connected", () => {
    console.log("Connected to Mongodb Server");
});


db.on("error", (err) => {
    console.log('Mongodb connection Errror :', err);
});


db.on("disconnected", () => {
    console.log("Mongodb Server is disconnected");
});


module.exports = db;