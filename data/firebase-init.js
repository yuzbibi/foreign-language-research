// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1-OnKwRb8sVaggzOlAKEKdsySWzgTxxI",
  authDomain: "school-research-site.firebaseapp.com",
  projectId: "school-research-site",
  storageBucket: "school-research-site.firebasestorage.app",
  messagingSenderId: "539565284539",
  appId: "1:539565284539:web:630b08efac05cc7b749d9e"
};

// Initialize Firebase (Compat SDK)
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and Cloud Storage
window.db = firebase.firestore();
window.storage = firebase.storage();
