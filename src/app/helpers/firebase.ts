import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC092WWqc_58yEei4oadsFjyzOez5suqps",
  authDomain: "hackathon-project-2023-cc86f.firebaseapp.com",
  projectId: "hackathon-project-2023-cc86f",
  storageBucket: "hackathon-project-2023-cc86f.appspot.com",
  messagingSenderId: "1020123947901",
  appId: "1:1020123947901:web:acdf2e5008cf2e9419a214",
  measurementId: "G-N1EWV4W38J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
