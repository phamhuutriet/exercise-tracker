const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

// API configure
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Route
const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter) //When someone go to '/exercises' endpoint, they will use the exerciseRouter
app.use('/users', usersRouter)


//Listen to the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
