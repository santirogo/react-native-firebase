import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCZL8O_ev5kh2WTVzTSQNDH9oah0HHDS6w",
  authDomain: "react-native-firebase-3cb1a.firebaseapp.com",
  projectId: "react-native-firebase-3cb1a",
  storageBucket: "react-native-firebase-3cb1a.appspot.com",
  messagingSenderId: "428488370007",
  appId: "1:428488370007:web:ac830ca00d1db27ec9c012"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
    db
}