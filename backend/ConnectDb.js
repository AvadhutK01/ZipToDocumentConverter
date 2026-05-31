require('dotenv').config();
const mongoose = require("mongoose");
console.log("MONGO_URI:", process.env.DB_URl);
const dbURI = process.env.DB_URl;


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');

});
