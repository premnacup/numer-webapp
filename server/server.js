const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { readdirSync } = require("fs");
const connectDB = require("./config/db");

connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

const routes = readdirSync("./routes");
routes.forEach((route) => {
  app.use("/api", require(`./routes/${route}`));
});

app.listen(5000, () => console.log("Server running on port 5000"));
