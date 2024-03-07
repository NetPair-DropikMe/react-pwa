/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyAe1JONk-_m7YgkDP1nsPnzOOVUQwP0exo",
  authDomain: "pwa-test-58902.firebaseapp.com",
  projectId: "pwa-test-58902",
  storageBucket: "pwa-test-58902.appspot.com",
  messagingSenderId: "334344577020",
  appId: "1:334344577020:web:01b0f0b5628f8c7009dc79",
  measurementId: "G-FJCE9760Y1",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/mstile-150x150.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
