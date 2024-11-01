const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("./config/db");

connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

const indexRoute = require("./routes/index");
app.use("/api", indexRoute);

app.listen(5000, () => console.log("Server running on port 5000"));
