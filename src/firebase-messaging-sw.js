importScripts(
  'https://www.gstatic.com/firebasejs/10.12.3/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.12.3/firebase-messaging-compat.js',
);

const config = {
  apiKey: "AIzaSyALHmXT8kXQeE9kiD77rjsEOxJFvuEieZA",
  authDomain: "demotelcel-448da.firebaseapp.com",
  projectId: "demotelcel-448da",
  storageBucket: "demotelcel-448da.appspot.com",
  messagingSenderId: "903873027426",
  appId: "1:903873027426:web:74e1bd8719d250b61aa03b"
}

firebase.initializeApp(config)
firebase.messaging()
