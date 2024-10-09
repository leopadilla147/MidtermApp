import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAQ2xUpthsqpKm8VLdjy6hEHZ3uEWYg9cw",
    authDomain: "midtermapp-61e12.firebaseapp.com",
    projectId: "midtermapp-61e12",
    storageBucket: "midtermapp-61e12.appspot.com",
    messagingSenderId: "131753164242",
    appId: "1:131753164242:web:26a5c2ca26397569a65c0b",
    measurementId: "G-TKVLM69PTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;