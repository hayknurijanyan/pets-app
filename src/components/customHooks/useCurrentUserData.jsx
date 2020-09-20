import React, { useEffect, useState } from "react";
import logger from "../../services/logService";
import firebase from "firebase";
import { db } from "../../firebase";
let log = console.log;
function useCurrentUserData() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    let unmounted = false;
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        const ref = db.collection("users").doc(user.uid);
        const collection = await ref.get();
        if (!unmounted) {
          setUserData({ ...collection.data() });
        }
      } else {
        logger.log("user data not found");
      }
    };
    fetchUserData();
    return () => {
      unmounted = true;
    };
  }, []);
  return userData;
}

export default useCurrentUserData;
