import firebase from 'firebase'

const db = {
    apiKey: "AIzaSyDFkVhFqYHs1vJ9kA61wCGjvqfsBzqrMOU",
    authDomain: "bookslist-ecfd5.firebaseapp.com",
    databaseURL: "https://bookslist-ecfd5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bookslist-ecfd5",
    storageBucket: "bookslist-ecfd5.appspot.com",
    messagingSenderId: "479532055253",
    appId: "1:479532055253:web:397daddb11d167466f405c"
}

const fire = firebase.initializeApp(db)

export default fire
