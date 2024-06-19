
//  load up all of our keys and values from the .env file into memory
// (we can access this through an object called "process.env")
require("dotenv").config();

//  Imports of 3rd-party Libraries
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser'); // to be able to read cookies

//  Intiliazing Express instance ('app') and define auxiliar variables
const app = express();
const port = 8000;

//  Enabling settings for being able to read JSON and parse url encoded data in requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Configuring cors in Express instace ('app')
const corsOptions = {
  credentials: true, // Allow credentials (cookies) to be sent to/from origin
  origin: 'http://localhost:3000', // Allow only this origin
  methods: 'GET, POST, PUT, DELETE', // Allow these methods
  // allowedHeaders: 'Content-Type, Authorization', // Allow these headers
};
app.use(cors(corsOptions));

// Incorporating cookie-parser middleware to Express instance ('app')
app.use(cookieParser());

//  Initializing connection to NoSQL database (MongoDB) using Moongose interface
require("./config/mongoose.config");

//  Importing API routes and incorporating them to 'app' instance
const UserRouter = require("./routes/user.routes");
const PetRouter = require("./routes/pet.routes");
app.use('/api/users', UserRouter);
app.use('/api/pets', PetRouter);

// Running instance of Express server in selected port
app.listen(port, () => console.log(`Listening on port: ${port}`));
