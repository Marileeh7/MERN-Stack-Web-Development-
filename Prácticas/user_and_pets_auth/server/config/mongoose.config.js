const mongoose = require("mongoose");

// 2) Setting connection to Mongo DB using 'mongoose' instance
mongoose.connect("mongodb://localhost:27017/users_and_pets", {
	useNewUrlParser: true, // Avoids deprecation warnings -> enables new MongoDB connection string parser
	useUnifiedTopology: true, // Avoids connection errors -> enables new unified topology engine for MongoDB Node.js driver
})
	.then(() => console.log("Established a connection to the database"))
	.catch(err => console.log("Something went wrong when connecting to the database", err));