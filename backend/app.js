const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const adminAtStartup = require("./utils/createAdminAtStart.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errorMiddleware");

//import allroutes
const allRoutes = require("./routes");
const createAllPermissions = require("./utils/createPermissions.js");

dotenv.config();

connectDB();

const app = express();

// ---- Middlewares--- //
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));

// ------ Routes ------ //

// createAllPermissions();
adminAtStartup();

app.get("/", (req, res) => {
  res.status(200).json({ message: "/ get request working" });
});

app.use(allRoutes);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});

