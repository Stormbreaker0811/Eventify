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



const filePath = "";
const PORT = process.env.PORT;
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

const standup = new db.Schema({
    date: String,
    poster: String,
    standup_city: String,
    standup_name: String,
    standup_price: String,
    standup_venue: String
})

const theatre = new db.Schema({
    theatre_show_name: String,
    theatre_venue: String,
    date: String,
    price: String, 
    city: String,
    poster: String
})

const music = new db.Schema({
    music_show_name: String,
    music_venue: String,
    city: String,
    price: String,
    date: String,
    poster: String
})

const movies = db.Schema({
    Movie_title: String,
    Genre: String,
    Language: String,
    Movie_desc: String,
    Poster_img: String
});


const movie = db.model("Movies",movies);

const User = db.model('User',user);

const Standup = db.model('Standup',standup);

const Theatre = db.model('Theatre', theatre);

const Music = db.model("Music", music);


app.post('/add-standup',(req,res) => {
    const data = req.body;
    const standup_data = {
        date: data.date,
        poster: data.poster,
        standup_city: data.city,
        standup_name: data.name,
        standup_price: data.price,
        standup_venue: data.venue
    }
    console.log(standup_data);
    Standup.create(standup_data).then(() => {
        console.log("Standup Data Added Success..//");
        res.status(200).send("Standup Data Addede Success..//");
    }).catch((err) => {
        console.error(err);
        res.status(400).send("Error Occurred..//")
    })

})

app.post('/add-theatre',(req,res) => {
    const data = req.body;
    const theatre_data = {
        date: data.date,
        poster: data.poster,
        city: data.city,
        theatre_show_name: data.name,
        standup_price: data.price,
        theatre_venue: data.venue
    }
    console.log(theatre_data);
    Theatre.create(theatre_data).then(() => {
        console.log("Theatre Data Added Success..//");
        res.status(200).send("Theatre Data Addede Success..//");
    }).catch((err) => {
        console.error(err);
        res.status(400).send("Error Occurred..//")
    })

})

app.post('/add-music',(req,res) => {
    const data = req.body;
    const music_data = {
        date: data.date,
        poster: data.poster,
        city: data.city,
        music_show_name: data.name,
        price: data.price,
        music_venue: data.venue
    }
    console.log(music_data);
    Theatre.create(music_data).then(() => {
        console.log("Music Data Added Success..//");
        res.status(200).send("Music Data Addede Success..//");
    }).catch((err) => {
        console.error(err);
        res.status(400).send("Error Occurred..//")
    })

})


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

app.get('/get-standup', async (req,res) => {
    try{
        const standup = await Standup.find();
        res.json(standup);
    }catch(err){
        console.error(err);
    }
})

app.get('/standup-homepage', async (req,res) => {
    try{
        const standup = await Standup.find();
        const data = standup.slice(0,4);
        res.json(data);
    }catch(err){
        console.error(err);
    }
})

app.get('/music-homepage', async (req,res) => {
    try{
        const music = await Music.find();
        const data = music.slice(0,4);
        res.json(data);
    }catch(err){
        console.error(err);
    }
})

app.get('/theatre-homepage', async (req,res) => {
    try{
        const theatre = await Theatre.find();
        const data = theatre.slice(0,4);
        res.json(data);
    }catch(err){
        console.error(err);
    }
})




app.post('/get-music', async (req,res) => {
    try{
        const music = await Music.find();
        res.json(music);
    }catch(err){
        console.error(err);
    }
})

app.post('/get-theatre', async (req,res) => {
    try{
        const theatre = await Theatre.find();
        res.json(theatre);
    }catch(err){
        console.error(err);
    }
});

app.get('/get-popular', async (req,res) => {
    try{
    const popular_content = [];

    const standup_content = await Standup.findOne({standup_name: "The Zakir Khan Show"});

    if(standup_content){
        popular_content.push(standup_content);
    }

    const theatre_content = await Theatre.findOne({theatre_show_name: "Matilda"});

    const music_content = await Music.findOne({ music_show_name: "Sunburn Arena ft. Alan Walker" });

    if(theatre_content){
        popular_content.push(theatre_content);
    }

    if(music_content){
        popular_content.push(music_content);
    }
    res.status(200).json(popular_content);
    }catch(error){
        console.error(error);
        res.status(400).send("Error..//")
    }
})



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
    if(mobile === null || mobile === "" || mobile === undefined){
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