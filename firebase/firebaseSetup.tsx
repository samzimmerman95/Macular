import * as firebase from 'firebase';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyA21S3yw24KueoeR_tmZzFe-mknAJNwccI",
    authDomain: "macular-8e95f.firebaseapp.com",
    databaseURL: "https://macular-8e95f.firebaseio.com",
    projectId: "macular-8e95f",
    storageBucket: "macular-8e95f.appspot.com",
    messagingSenderId: "295446126603",
    appId: "1:295446126603:web:d2f6494f7ec0743df3e70e",
    measurementId: "G-WQ4BFQFJB5"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig) 
}
export default firebase