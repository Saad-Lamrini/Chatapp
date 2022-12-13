// Import the functions you need from the SDKs you need
import app from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC8SYGanoU0KcqLUhHeVgTrfNoNkHt9Ak4',
  authDomain: 'chatappaplication.firebaseapp.com',
  databaseURL: 'https://chatappaplication-default-rtdb.firebaseio.com',
  projectId: 'chatappaplication',
  storageBucket: 'chatappaplication.appspot.com',
  messagingSenderId: '994844306358',
  appId: '1:994844306358:web:34313e86818ecb46876f17',
  measurementId: 'G-1NDR0RTYHN',
};

// Initialize Firebase
const initfirebase = app.initializeApp(firebaseConfig);

export default initfirebase;
