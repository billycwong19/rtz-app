// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3ISZaPJowMpzRtyOPqZyraMt-Z1UgxsQ",
  authDomain: "rtz-6a89a.firebaseapp.com",
  projectId: "rtz-6a89a",
  storageBucket: "rtz-6a89a.appspot.com",
  messagingSenderId: "497325550401",
  appId: "1:497325550401:web:d66d51e64a3fb85bdbcfc0",
  measurementId: "G-EYRF8D5D5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)


