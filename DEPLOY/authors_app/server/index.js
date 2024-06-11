require ('dotenv');
require('./config/mongoose.config');
const port= process.env.PORT;
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/author.routes')(app);

app.listen(port, () => {
    console.log(`Listening at Port ${port}`)
});
