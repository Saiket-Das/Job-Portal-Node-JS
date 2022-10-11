require("dotenv").config();
const dbConnection = require("./confiq/db");

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

// ------> Middleware
app.use(cors());
app.use(express.json());

dbConnection();

const userRoutes = require("./routes/user.route");
const jobRoutes = require("./routes/job.route");
const managerRoutes = require("./routes/manager.route");

//------> Routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/manager", managerRoutes);

app.get("/", (req, res) => {
  res.send("Job Portal is running");
});

app.listen(port, function () {
  console.log(`Job Portal is running on ${port}`.white);
});
