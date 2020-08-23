import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
let log = console.log;

const useAllUsersData = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newArray = [];
      const snapshot = await db.collection("users").get();
      snapshot.docs.forEach((doc) => {
        newArray.push(doc.data());
      });
      setAllUsers(newArray);
    };
    fetchData();
  }, []);

  return allUsers;
};

export default useAllUsersData;
