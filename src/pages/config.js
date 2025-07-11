import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyAO0aViXNGQPJp0UbopefrMTWdmyLEpWAM",
  authDomain: "devnest-d0386.firebaseapp.com",
  projectId: "devnest-d0386",
  storageBucket: "devnest-d0386.firebasestorage.app",
  messagingSenderId: "1011441499978",
  appId: "1:1011441499978:web:cf5ea19ba6bb5773460bb3" 
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app)

export default auth;