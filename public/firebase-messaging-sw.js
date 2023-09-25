importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js"
);

// Initialize Firebase again, as this runs in the service worker context
firebase.initializeApp({
  apiKey: "AIzaSyCIpKNGMVZuWkvMjrfJDvqxZ2m9Ewj8e_w",
  authDomain: "e-gate-bcc51.firebaseapp.com",
  projectId: "e-gate-bcc51",
  storageBucket: "e-gate-bcc51.appspot.com",
  messagingSenderId: "396750933086",
  appId: "1:396750933086:web:8383e5f634968b691838cf",
  //   measurementId: "YOUR_MEASUREMENT_ID",
});

const messaging = firebase.messaging();