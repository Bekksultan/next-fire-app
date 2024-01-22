// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBivqiLQJxOu8kyvF6fjNNljpIxgR-6RF4",
  authDomain: "expense-tracker-721fc.firebaseapp.com",
  projectId: "expense-tracker-721fc",
  storageBucket: "expense-tracker-721fc.appspot.com",
  messagingSenderId: "793970299078",
  appId: "1:793970299078:web:b6005761d8f2e0071007c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);