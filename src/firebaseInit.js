import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCIpKNGMVZuWkvMjrfJDvqxZ2m9Ewj8e_w",
  authDomain: "e-gate-bcc51.firebaseapp.com",
  projectId: "e-gate-bcc51",
  storageBucket: "e-gate-bcc51.appspot.com",
  messagingSenderId: "396750933086",
  appId: "1:396750933086:web:8383e5f634968b691838cf",
  // measurementId: "YOUR_MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };