import { initializeApp, getApps } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBvDfgkv2VnrIMbrT9oJYgtlL6XGthURdY",
  projectId: "humhum-d8850",
  messagingSenderId: "569896873041",
  appId: "1:569896873041:web:9551d54e2e7056fcacdc70",
  vapidKey:
    "BCg19OadFV9lZNChEu1nhKI9zW2HRqiVls8U_4UVQyRLz5rVf3-2qzUSBWdTB7U0nqa-O7lho69FM8VdRsQW970",
};
const apps = getApps();
const app = !apps.length ? initializeApp(firebaseConfig) : apps[0];

let messaging = null;
if ("serviceWorker" in navigator) {
  messaging = getMessaging(app);
}

export { messaging };
