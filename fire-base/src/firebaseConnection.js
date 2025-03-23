import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore' 
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBnGc_sG_K4KCcGDQ7vaZOlYjGmsWtENWc",
    authDomain: "curso-ab017.firebaseapp.com",
    projectId: "curso-ab017",
    storageBucket: "curso-ab017.firebasestorage.app",
    messagingSenderId: "751386580166",
    appId: "1:751386580166:web:474e42460e8805a89c73c7",
    measurementId: "G-K9S3C5PMNZ"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp)

  const auth = getAuth(firebaseApp)

  export{ db, auth };