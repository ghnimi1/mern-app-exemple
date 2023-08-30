require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/user.route");
const employeeRoutes = require("./routes/employee.route");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/auth", userRoutes);
app.use("/api/employee", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port `, PORT));
