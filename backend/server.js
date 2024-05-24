const {initializeApp} = require('firebase/app');
const {getAnalytics} = require('firebase/analytics');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const express = require('express');
const dotenv = require('dotenv');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const db = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const qr = require('qrcode');
const { log } = require('console');

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

let descData = {};



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
    city: String,
    name: String,
    price: String,
    gold_price: Number,
    platinum_price: Number,
    venue: String
})

const theatre = new db.Schema({
    name: String,
    venue: String,
    date: String,
    price: String,
    gold_price: Number,
    platinum_price: Number,
    city: String,
    poster: String
})

const music = new db.Schema({
    name: String,
    venue: String,
    city: String,
    price: String,
    gold_price: Number,
    platinum_price: Number,
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

const orders = new db.Schema({
    _id: Number,
    user_name: String,
    order_number: String,
    order_date: String,
    event_name: String
});

const movie = db.model("Movies",movies);

const User = db.model('User',user);

const Standup = db.model('Standup',standup);

const Theatre = db.model('Theatre', theatre);

const Music = db.model("Music", music);

const Order = db.model("Orders",orders);

let order_id_count = 1;

app.post("/google-sign-in",async (req,res) => {
    const data = req.body;
    const user_data = new User({
        Name: data.displayName,
        Email: data.email,
        Mobile: data.phoneNumber,
        Password: data.password.password
    })
    await User.create(user_data).then((doc) => {
        return res.status(200).json(doc);
    }).catch((err) => {
        console.error(err);
    })
});

app.post("/google-login", async (req,res) => {
    const userData = req.body;
    await User.findOne({Email: userData.email}).then((doc) => {
        return res.status(200).json(doc);
    }).catch((err) => {
        console.error(err);
    })
})

app.post('/add-standup',(req,res) => {
    const data = req.body;
    const standup_data = {
        date: data.date,
        poster: data.poster,
        city: data.city,
        name: data.name,
        price: data.price,
        venue: data.venue
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
        price: data.price,
        venue: data.venue
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
        name: data.name,
        price: data.price,
        venue: data.venue
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

const request4DigitNumber = () => {
    let number = Math.floor(1000 + Math.random() * 9000);
    return number;
}

const getCurrentDate = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    return currentDate;
}

app.post('/orders',async (req,res) => {
    const user = req.body;
    console.log(user)
    const currentDate = getCurrentDate();
    let name = "";
    await User.findOne({Email: user.user_email}).then((doc) => {
        name = doc.Name;
    })
    const new_order = new Order({
        _id: order_id_count,
        user_name: name,
        order_number: request4DigitNumber(),
        order_date: currentDate,
        event_name: user.event_name
    })
    let prev_order_count = order_id_count;
    order_id_count = prev_order_count + 1;
    await new_order.save().then(() => {
        console.log("order added");
        return res.status(200).send("Order Added..//");
    }).catch((err) => {
        console.error(err);
    })
})

app.get('/get-orders',async (req,res) => {
    const order_data = req.query.name;
    console.log(order_data);
    let event_name = "";
    await Order.findOne({user_name: order_data}).then((doc) => {
        event_name = doc.event_name;
    }).catch((err) => {
        console.error(err);
    });
    const standup = await Standup.findOne({name: event_name});
    const music = await Music.findOne({name: event_name});
    const theatre = await Theatre.findOne({name: event_name});
    if(standup != null || standup != undefined){
        console.log(standup);
        return res.status(200).json(standup);
    }else if(music != null || music != undefined){
        console.log(music);
        return res.status(200).json(music);
    }else if(theatre != null || theatre != undefined){
        console.log(theatre);
        return res.status(200).json(theatre);
    }
})

app.post('/register' , (req,res) => {
    const data = req.body;
    console.log(data);
    const name = data.user_name;
    const email = data.user_email;
    const password = data.user_password;
    const mobile = data.user_mobile;
    const isLogin = User.find({ Email: email, Password: password });
    if(isLogin > 0){
        return res.status(400).send("User Already Logged In..//");
    }
    const user_data = new User({
        Name: name,
        Email: email,
        Password: password,
        Mobile: mobile,
    });
    user_data.save().then(() => {
        console.log("User Data Inserted..//");
    }).catch((error) => console.log(error));
    createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
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

app.post('/post-requested-show', (req,res) => {
    descData = req.body;
    console.log("descData loaded..//");
    console.log(descData);
    if(descData){
        res.status(200).send(true);
    }else{
        res.status(400).send(false);
    }
    // window.location.href = '/desc';
})

app.get('/get-requested-show',async (req,res) => {
    console.log("descInfo got..//")
    console.log(descData);
    const id = descData.id;
    if(descData.category === "theatre"){
        await Theatre.findOne({ name: descData.show_name })
        .then((doc) => {
            res.status(200).json(doc);
        }).catch((err) => {
            console.error(err);
        })
    }else if(descData.category === "music"){
        await Music.findOne({ name: descData.show_name})
        .then((doc) => {
            res.status(200).json(doc);
        }).catch((err) => {
            console.error(err);
        })

    }else if(descData.category === "standup"){
        await Standup.findOne({ name: descData.show_name }).then((doc) => {
            res.status(200).json(doc);
        }).catch((err) => {
            console.error(err);
        })
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

    const standup_content = await Standup.findOne({name: "The Zakir Khan Show"});

    if(standup_content){
        popular_content.push(standup_content);
    }

    const theatre_content = await Theatre.findOne({name: "Matilda"});

    const music_content = await Music.findOne({ name: "Sunburn Arena ft. Alan Walker" });

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
    console.log(formData);
    const email =  formData.user_email;
    const password =  formData.user_password;
    const mobile = formData.user_mobile;
    if(mobile === null || mobile === "" || mobile === undefined){
        let user_data = await User.findOne({Email: email,Password : password});
        console.log(user_data)
        if(user_data){
            res.status(200).json(user_data);
        }else{
            res.status(400).send("No user data found..//");
        }
    }else if (email === undefined || email === null || email === ""){
        const user_data = await User.findOne({Mobile: mobile,Password: password});
        console.log(user_data)
        if(user_data){
            res.status(200).json(user_data);
        }else{
            res.status(400).send("User not found..//");
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

app.post('/payments',(req,res) => {
    const data = req.body;
    const amount = data.Amount;
    const upi_id = process.env.UPI_ID;
    const upiString = `upi://pay?pa=${upi_id}&pn=Nimish Godbole&am=${amount}&cu=INR`;
    qr.toDataURL(upiString , (err,url) => {
        if(err){
            res.status(500).send("QR Code Generation Fail..//");
        }else{
            res.json({ qrCodeUrl: url });
        }
    })
})

app.get('/', (req,res) => {
    res.status(200).send("Hello World!");
    console.log("GET is working");
});



app.listen(PORT);