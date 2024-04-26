const {initializeApp} = require('firebase/app');
const {getAnalytics} = require('firebase/analytics');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const express = require('express');
const dotenv = require('dotenv');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const db = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const navigator = require('navigator');
const path = require('path');
const multer = require('multer');

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
app.use(cors());
app.use(express.json());
const auth = getAuth();


const PORT = process.env.PORT || 5000;
const filePath = "";
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, 'E:/nimish/mit wpu/Final Project/event_management_system/backend/uploads');
    },
    filename: function (req,file,cb){
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + ext);
    }
})
const upload = multer({ storage: storage});

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
});

const movies = db.Schema({
    Movie_title: String,
    Genre: String,
    Language: String,
    Movie_desc: String,
    Poster_img: String
});


const movie = db.model("Movies",movies);

const User = db.model('User',user);


app.post('/register' , (req,res) => {
    const data = req.body;
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
    });

    return res.status(200).send("Registration Success..//");
});

app.post('/get-movies', async (req,res) => {
    try {
        // Fetch movies from MongoDB
        const movies = await movie.find();
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Error fetching movies' });
    }
});

app.post('/post-movies', upload.single('poster'),(req,res,next) => {
    const movie_data = {
        Movie_title: req.body.movie_title,
        Genre: req.body.genre,
        Language: req.body.language,
        Poster_img: filePath
    };
    console.log(movie_data);
    movie.create(movie_data)
    .then(() => {
        res.status(200).send("Movie Added SuccessFully..//");
    }).catch(() => {
        console.error("Error adding movie: "+error);
        res.status(500).send('Error Adding Movie..//');
    });
});

app.post('/login', async (req,res) => {
    const formData = req.body;
    console.log(formData)
    const email =  formData.email;
    const password =  formData.password;
    const mobile = formData.mobile;
    if(mobile === null || mobile === ""){
        const user_data = await User.findOne({Email: email,Password : password});
        console.log(user_data)
        if(user_data){
            res.status(200).send(true);
        }else{
            res.status(400).send(false);
        }
    }else if (mobile === undefined || email === undefined){
        return res.status(400).send(false)
        }else{
            const user_data = await User.findOne({Mobile: mobile,Password: password});
            if(user_data){
                res.status(200).send(true);
            }else{
                res.status(400).send(false);
            }
        }
});

app.post('/posters', async (req,res) => {
    const storage = getStorage();
    const data = req.body;
    const file = data.poster;
    const storageRef = ref(storage, 'Movie Posters/');
    uploadBytes(storageRef,file).then((snapshot) => {
        console.log("File Uploaded Successfully")
        res.status(200).send("File Upload Success..//");
        getDownloadURL(storageRef).then((downloadURL) => {
            console.log("File Available at: "+downloadURL)
            filePath = downloadURL;
        }).catch((err) => {
            console.error(err);
            res.status(400).send(err);
        })
    }).catch((err) => {
        console.error(err);
    })
});

app.get('/', (req,res) => {
    res.status(200).send("Hello World!");
    console.log("GET is working");
});



app.listen(PORT);