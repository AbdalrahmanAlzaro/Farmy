import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQOTKHI5TB3-M3TqVbhzmfI647vO87BSA",
  authDomain: "harvestmart-929c6.firebaseapp.com",
  projectId: "harvestmart-929c6",
  storageBucket: "harvestmart-929c6.appspot.com",
  messagingSenderId: "832491852908",
  appId: "1:832491852908:web:ee07d01b98babced907449",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get Firebase Auth and Firestore instances
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
