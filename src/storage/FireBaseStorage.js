// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLrfnrm2byu1GqvLoIhnV7NT7gYcM2bk0",
  authDomain: "data-589ed.firebaseapp.com",
  databaseURL: "https://data-589ed-default-rtdb.firebaseio.com",
  projectId: "data-589ed",
  storageBucket: "data-589ed.appspot.com",
  messagingSenderId: "878905895641",
  appId: "1:878905895641:web:3a709eb28b733d4a29ecc8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
export default storage;

