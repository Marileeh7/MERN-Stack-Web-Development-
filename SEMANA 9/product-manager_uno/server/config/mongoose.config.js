const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/product_manager_uno', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to the database'))
    .catch(err => console.log('Error connecting to the database', err));
