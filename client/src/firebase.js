import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: 'AIzaSyCD9tXTWydAN6sEVfwuP8uM43jDaLIc4XM',
  authDomain: 'zakanban.firebaseapp.com',
  databaseURL: 'https://zakanban.firebaseio.com',
  projectId: 'zakanban',
  storageBucket: 'zakanban.appspot.com',
  messagingSenderId: '539907032676'
})

export const db = app.database()
