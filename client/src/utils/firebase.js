
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from"firebase/auth"

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-8b3f5.firebaseapp.com",
  projectId: "interviewiq-8b3f5",
  storageBucket: "interviewiq-8b3f5.firebasestorage.app",
  messagingSenderId: "1042972410603",
  appId: "1:1042972410603:web:3b0b270d399c5f2efef4ae"
};

const app = initializeApp(firebaseConfig);

const auth=getAuth(app)

const provider=new GoogleAuthProvider

export {auth , provider}