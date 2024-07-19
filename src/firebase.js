import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBJoendDBgMRRfwugnL4zE9M7XTZGAnwX0",
    authDomain: "myreact-cdc07.firebaseapp.com",
    projectId: "myreact-cdc07",
    storageBucket: "myreact-cdc07.appspot.com",
    messagingSenderId: "379490128051",
    appId: "1:379490128051:web:e5d6188aad4b0c463720c6",
    measurementId: "G-BFEG9R45QM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
