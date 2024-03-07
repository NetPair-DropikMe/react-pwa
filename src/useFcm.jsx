import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import firebaseApp from "./firebase";

const useFcmToken = () => {
  const [token, setToken] = useState();
  const [notificationPermission, setNotificationPermission] = useState("");
  const retrieveToken = async () => {
    try {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        const messaging = getMessaging(firebaseApp);

        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);

        if (permission === "granted") {
          const cT = await getToken(messaging, {
            vapidKey:
              "BHOscxaEj24wI1b5xShLr0SmJ68iF7xPDugRoqAY1FNWzBXqTBly5es56x7RbQFGt8jrksI2BuoYa-iehpUzrpE",
          });
          if (cT) {
            setToken(cT);
          }
        }
      }
    } catch (error) {
      console.log("An error occurred while retrieving token:", error);
    }
  };

  useEffect(() => {
    retrieveToken();
  }, []);

  return { fcmToken: token, notificationPermission };
};

export default useFcmToken;
