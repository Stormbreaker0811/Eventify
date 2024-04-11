const express = require('express');
const dotenv = require('dotenv');
const db = require('mongoose');

const app = express();
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const db_uri = process.env.DB_URI;

db.connect(db_uri).then( () => {
    console.log("Database Connection Success..//")
}).catch( (err) => {
    console.error(err);
});

app.get('/', (req,res) => {
    res.status(400).send("Hello World!");
    console.log("GET is working");
});



app.listen(PORT);