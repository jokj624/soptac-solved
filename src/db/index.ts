import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyApXUhqlgYfQxdkDgY8JwXiR6U-nzsLSkc",
    authDomain: "soptac-e893e.firebaseapp.com",
    projectId: "soptac-e893e",
    storageBucket: "soptac-e893e.appspot.com",
    messagingSenderId: "924227029046",
    appId: "1:924227029046:web:50b3f130160cf106313097"
}

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();