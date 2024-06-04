const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/product_manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to the database'))
    .catch(err => console.log('Error connecting to the database', err));
