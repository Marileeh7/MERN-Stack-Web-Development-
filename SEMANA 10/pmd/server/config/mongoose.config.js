require ('dotenv');
const mongoose = require("mongoose");

const URI = process.env.MONGO_URL;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(".mongoose.config.js: Established connection to Database"))
    .catch(err => console.log("ERROR:", err));
