import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { db } from "../../firebase";
let log = console.log;
function useCurrentUserData() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        const ref = db.collection("users").doc(user.uid);
        const collection = await ref.get();

        setUserData({ ...collection.data() });
      } else {
        log("user data not found");
      }
    };
    fetchUserData();
  }, []);
  console.log(userData, "hook");
  return userData;
}

export default useCurrentUserData;
