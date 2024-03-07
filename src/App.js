import React, { useEffect, useState } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseApp from "./firebase";
import { postToken } from "./api";

const App = () => {
  const [name, setName] = useState("unknown");
  const [token, setToken] = useState();

  useEffect(() => {
    retrieveToken();
  }, []);

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

  const retrieveToken = async () => {
    try {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        const messaging = getMessaging(firebaseApp);

        const permission = await Notification.requestPermission();

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

  return (
    <>
      <div>App</div>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        name="name"
        placeholder="Enter your name"
      />
      <button
        onClick={async () => {
          const res = await postToken({ name, token });
          if (res) alert("Token submitted!");
          else alert("Error while token submit!");
        }}
      >
        Submit
      </button>

      {token && (
        <div
          onClick={() => copyToClipboard(token)}
          role="button"
          style={{ cursor: "pointer" }}
        >
          {token}
        </div>
      )}
    </>
  );
};

export default App;
