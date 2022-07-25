importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig =  {
  apiKey: 'AIzaSyBvDfgkv2VnrIMbrT9oJYgtlL6XGthURdY',
  projectId: 'humhum-d8850',
  messagingSenderId: '569896873041',
  appId: '1:569896873041:web:9551d54e2e7056fcacdc70',
  vapidKey:
    'BCg19OadFV9lZNChEu1nhKI9zW2HRqiVls8U_4UVQyRLz5rVf3-2qzUSBWdTB7U0nqa-O7lho69FM8VdRsQW970',
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  // const notificationTitle = 'Background Message Title';
  // const notificationOptions = {
  //   body: 'Background Message body.',
  //   icon: '/firebase-logo.png'
  // };

  // self.registration.showNotification(notificationTitle,
  //   notificationOptions);
});