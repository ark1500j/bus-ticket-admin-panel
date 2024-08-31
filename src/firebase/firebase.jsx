// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // If you are using Firebase Authentication
import { getFirestore } from "firebase/firestore"; // If you are using Firestore
import { getStorage } from "firebase/storage"; // If you are using Firebase Storage

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBPZYZpgKau5AiOdeu6fvv9ztjhSBGrjg",
  authDomain: "authproject-b3b5b.firebaseapp.com",
  databaseURL: "https://authproject-b3b5b-default-rtdb.firebaseio.com",
  projectId: "authproject-b3b5b",
  storageBucket: "authproject-b3b5b.appspot.com",
  messagingSenderId: "191539177507",
  appId: "1:191539177507:web:6a69320745dfeb7103a996"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);  // Authentication
const db = getFirestore(app);  // Firestore Database
const storage = getStorage(app);  // Storage

// Export initialized services for use in other parts of your app
export { auth, db, storage };