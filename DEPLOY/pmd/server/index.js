require ('dotenv');
require('./config/mongoose.config');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT; 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/product.routes')(app);

app.listen(port, () => {
    console.log(`Listening at Port ${port}`)
});
