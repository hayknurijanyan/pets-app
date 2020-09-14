import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
let log = console.log;

const useAllUsersData = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    let unmounted = false;
    const fetchData = async () => {
      const newArray = [];
      const snapshot = await db.collection("users").get();
      snapshot.docs.forEach((doc) => {
        newArray.push(doc.data());
      });
      if (!unmounted) {
        setAllUsers(newArray);
      }
    };
    fetchData();
    return () => {
      unmounted = true;
    };
  }, []);

  return allUsers;
};

export default useAllUsersData;
