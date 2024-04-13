const express = require('express');
const dotenv = require('dotenv');
const db = require('mongoose');
const navigator = require('navigator');

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

const user = new db.Schema({
    Name: String,
    Email: String,
    Mobile: String,
    Age: Number,
    Gender: String,
    Location: String
})

const User = db.model('User',user);


app.post('/register' , (req,res) => {
    let data = req.body;
    const name = data.name;
    const email = data.email;
    const mobile = data.mobile;
    const age = data.age;
    const gender = data.gender;
    const location = data.location
    const user_data = new User({
        Name: name,
        Email: email,
        Mobile: mobile,
        Age: age,
        Gender: gender,
        Location: location
    });
    user_data.save().then(() => {
        console.log("User Data Inserted..//");
    }).catch((error) => console.log(error));

    return res.status(200).send("Registration Success..//");
})

app.get('/', (req,res) => {
    res.status(200).send("Hello World!");
    console.log("GET is working");
});



app.listen(PORT);