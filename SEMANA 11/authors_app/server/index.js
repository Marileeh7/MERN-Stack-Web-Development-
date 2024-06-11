require('./config/mongoose.config');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/author.routes')(app);

app.listen(port, () => {
    console.log(`Listening at Port ${port}`)
});
