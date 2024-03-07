import React, { useEffect } from "react";
import useFcmToken from "./useFcm";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "./firebase";

const App = () => {
  const { fcmToken } = useFcmToken();

  const copyToClipboard = (str) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(str);
    }
  };
  useEffect(() => {
    const messaging = getMessaging(firebaseApp);
    const unsubscribe = onMessage(messaging, (msg) => {
      console.log(msg);
      alert(msg?.notification?.body);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <div>App</div>
      <button>Send Notification</button>
      {fcmToken && (
        <div
          onClick={() => copyToClipboard(fcmToken)}
          role="button"
          style={{ cursor: "pointer" }}
        >
          {fcmToken}
        </div>
      )}
    </>
  );
};

export default App;
