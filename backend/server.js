const {initializeApp} = require('firebase/app');
const {getAnalytics} = require('firebase/analytics');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const express = require('express');
const dotenv = require('dotenv');
const db = require('mongoose');
const navigator = require('navigator');

const firebaseConfig = {
    apiKey: "AIzaSyD1lQHPRVotGok9JFb3XCSGhORUT9E_hGg",
    authDomain: "eventify-1fa83.firebaseapp.com",
    projectId: "eventify-1fa83",
    storageBucket: "eventify-1fa83.appspot.com",
    messagingSenderId: "183821440386",
    appId: "1:183821440386:web:54cd973af67f1144e6eb9b",
    measurementId: "G-ZQP4X5DXWX"
};

const firebaseapp = initializeApp(firebaseConfig);

const app = express();
dotenv.config();
app.use(express.json());
const auth = getAuth();


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
    Password: String,
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
    const password = data.password;
    const mobile = data.mobile;
    const age = data.age;
    const gender = data.gender;
    const location = data.location
    const user_data = new User({
        Name: name,
        Email: email,
        Password: password,
        Mobile: mobile,
        Age: age,
        Gender: gender,
        Location: location
    });
    user_data.save().then(() => {
        console.log("User Data Inserted..//");
    }).catch((error) => console.log(error));

    createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
        //Signed Up
        const user = userCredential.user;
        console.log(user.uid);
        const uid = user.uid;
    })

    return res.status(200).send("Registration Success..//");
})

app.get('/', (req,res) => {
    res.status(200).send("Hello World!");
    console.log("GET is working");
});



app.listen(PORT);