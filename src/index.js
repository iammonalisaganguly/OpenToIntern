const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route");
const app = express();
const multer = require("multer");

app.use(multer().any());
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://group22:1234@group22databse.uvtoalh.mongodb.net/group25Database",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Project2 mongoDB is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3001, function () {
  console.log("express run on server " + (process.env.PORT || 3001));
});
