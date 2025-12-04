import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// TODO: Replace with your actual Firebase project configuration
// For development, these placeholders are fine if using emulators, 
// but you'll need real keys for production.
const firebaseConfig = {
    apiKey: "AIzaSyDOC-PLACEHOLDER-KEY",
    authDomain: "mansa-tina-marketing.firebaseapp.com",
    projectId: "mansa-tina-marketing",
    storageBucket: "mansa-tina-marketing.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

export default app;
