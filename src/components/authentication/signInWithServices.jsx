import React, { useState, useEffect } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { db } from "../../firebase";
import defaultUser from "./defaultUser";
import { Redirect } from "react-router-dom";
import logger from "../../services/logService";
let log = console.log;

function SignInWithServices() {
  const [signIn, setSignIn] = useState(false);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: async () => {
        try {
          const user = firebase.auth().currentUser;
          if (user) {
            const ref = db.collection("users").doc(user.uid);
            const collection = await ref.get();
            if (collection.data() === undefined) {
              db.collection("users")
                .doc(user.uid)
                .set({
                  userId: db.doc(`users/${user.uid}`),
                  email: user.email,
                  ...defaultUser(),
                })
                .then(() => {
                  window.location = "/";
                });
            } else {
              return;
            }
          }
        } catch (err) {
          logger.log(err);
          log(err);
        }
      },
    },
  };

  useEffect(() => {
    let unmounted = false;
    firebase.auth().onAuthStateChanged((user) => {
      if (!unmounted) {
        setSignIn(!!user);
      }
    });
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {signIn ? (
        <Redirect to="/newsfeed" />
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  );
}

export default SignInWithServices;
