const express = require('express');
const connectDB = require('./config/db');
const AuthRoutes = require('./routes/AuthRoutes');
const TodoRoutes = require('./routes/TodoRoutes');
const bodyParser = require('body-parser');
const cors= require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", AuthRoutes);
app.use("/todos", TodoRoutes);

app.get("/", (req, res) => {
  res.send("Todo api running");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
