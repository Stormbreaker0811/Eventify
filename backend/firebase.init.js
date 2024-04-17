// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1lQHPRVotGok9JFb3XCSGhORUT9E_hGg",
  authDomain: "eventify-1fa83.firebaseapp.com",
  projectId: "eventify-1fa83",
  storageBucket: "eventify-1fa83.appspot.com",
  messagingSenderId: "183821440386",
  appId: "1:183821440386:web:54cd973af67f1144e6eb9b",
  measurementId: "G-ZQP4X5DXWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;