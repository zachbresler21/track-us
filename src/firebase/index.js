import firebase from 'firebase/app'
import 'firebase/storage'

// bookhub's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyCIN8hPpD7MaSuDpSiUNx75BBnFjgr9-20",
    authDomain: "track-us-2a92c.firebaseapp.com",
    databaseURL: "https://track-us-2a92c.firebaseio.com",
    projectId: "track-us-2a92c",
    storageBucket: "track-us-2a92c.appspot.com",
    messagingSenderId: "321347899000",
    appId: "1:321347899000:web:8096f2fd9b357af24a678d",
    measurementId: "G-92DMY02NH6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

const storage = firebase.storage();

export {
    storage, firebase as default
}