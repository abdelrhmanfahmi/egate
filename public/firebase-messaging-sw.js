// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// const firebaseConfig =  {
//   apiKey: 'AIzaSyBvDfgkv2VnrIMbrT9oJYgtlL6XGthURdY',
//   projectId: 'humhum-d8850',
//   messagingSenderId: '569896873041',
//   appId: '1:569896873041:web:9551d54e2e7056fcacdc70',
//   vapidKey:
//     'BCg19OadFV9lZNChEu1nhKI9zW2HRqiVls8U_4UVQyRLz5rVf3-2qzUSBWdTB7U0nqa-O7lho69FM8VdRsQW970',
// }

// firebase.initializeApp(firebaseConfig)

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   // const notificationTitle = 'Background Message Title';
//   // const notificationOptions = {
//   //   body: 'Background Message body.',
//   //   icon: '/firebase-logo.png'
//   // };

//   // self.registration.showNotification(notificationTitle,
//   //   notificationOptions);
// });
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBvDfgkv2VnrIMbrT9oJYgtlL6XGthURdY",
  projectId: "humhum-d8850",
  messagingSenderId: "569896873041",
  appId: "1:569896873041:web:9551d54e2e7056fcacdc70",
};

firebase.initializeApp(firebaseConfig);

// intercept notification
class CustomPushEvent extends Event {
  constructor(data) {
    super("push");

    Object.assign(this, data);
    this.custom = true;
  }
}

self.addEventListener("push", (e) => {
  if (e.custom) return;

  let oldData = e.data;
  let newEvent = new CustomPushEvent({
    data: {
      old: oldData.json(),
      json() {
        let newData = oldData.json();
        newData.data = {
          ...newData.data,
          notification: newData.notification,
        };
        delete newData.notification;
        return newData;
      },
    },
    waitUntil: e.waitUntil.bind(e),
  });

  e.stopImmediatePropagation();
  dispatchEvent(newEvent);
});

// listen on click
self.addEventListener("notificationclick", (event) => {
  const base = self.location.origin;
  event.notification.close();
  const { type_id, type } = event.notification.data;

  let url = "/";
  // switch (type) {
  //   case "order":
  //     url = `/viewOrderDetails?id=${type_id}`;
  //     break;
  //   case "product":
  //     url = `/product/details/${type_id}`;
  //     break;
  //   // case "quote":
  //   //   url = `/quotes/quote-details/${type_id}`;
  //   //   break;
  //   case "return":
  //     url = `/ReturnedRequest?UUID=${type_id}`;
  //     break;
  //   // case "financials":
  //   //   url = `/financials/transactions`;
  //   //   break;
  //   default:
  //     url = "/";
  // }

  if (type === "return_item") {
    this.$router.push({
      path: "/ReturnedRequest",
      query: {
        UUID: type_id,
      },
    });
  } else if (type === "order") {
    this.$router.push({
      path: "/viewOrderDetails",
      query: {
        id: type_id,
      },
    });
  } else if (type === "RFQ") {
    this.$router.push({
      path: "/profile/quotationDetails",
      query: {
        id: itype_idd,
      },
    });
  } else if (type === "chat") {
    this.$router.push({
      path: "/viewCorresponseDetails",
      query: {
        id: type_id,
      },
    });
  }

  const link = new URL(base).href;
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientsArr) => {
        const hadWindowToFocus = clientsArr.some((windowClient) =>
          windowClient.url === link ? (windowClient.focus(), true) : false
        );

        if (!hadWindowToFocus)
          self.clients
            .openWindow(link)
            .then((windowClient) =>
              windowClient ? windowClient.focus() : null
            );
      })
  );
});

// handel messages
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.data.notification.title;
  const notificationOptions = {
    body: payload.data.notification.body,
    data: payload.data,
    icon: "https://staging2.fabrica-dev.com/humhum-user/img/logo.42fe99c6.png",
  };

  self.clients
    .matchAll({
      includeUncontrolled: true,
      type: "window",
    })
    .then((clients) => {
      if (clients && clients.length) {
        // Send a response - the clients
        // array is ordered by last focused
        clients[0].postMessage({
          type: "NEW-HUMHUM-NOTIFICATION",
          notification: payload,
        });
      }
    });

  self.registration.showNotification(notificationTitle, notificationOptions);
});
