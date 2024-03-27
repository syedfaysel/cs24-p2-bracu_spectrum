const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const adminAtStartup = require('./utils/createAdminAtStart.js');


//import allroutes
const allRoutes = require("./routes");

dotenv.config();

connectDB();
adminAtStartup();

const app = express();

// ---- Middlewares--- //
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));

// ------ Routes ------ //
app.get("/", (req, res) => {
  res.status(200).json({ message: "/ get request working" });
});

app.use(allRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
