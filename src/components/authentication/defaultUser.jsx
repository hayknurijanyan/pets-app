import React, { useEffect } from "react";

function defaultUser() {
  const firstName = "Person";
  const lastName = "Person";
  const pet = "dog";
  const breed = "none";
  const petName = "none";
  const petAge = 0;
  const petGender = "none";
  const age = 0;
  const bio = "none";
  const location = {
    country: "none",
    city: "none",
  };
  const contactNumber = "none";
  const maleFemale = "Male";
  const profession = "none";
  const avatar = "";
  const photos = [];
  const coverPhoto = "";
  const defaultPetUrl =
    "https://firebasestorage.googleapis.com/v0/b/charo-5107b.appspot.com/o/petPictures%2Fdog.jpg?alt=media&token=24f91ccc-5e21-41c4-9edb-ad0ac4ada50b";

  const petInfo = {
    name: "none",
    petsGender: "none",
    breed: "none",
    age: 0,
    behavior: "none",
  };

  const dataObj = {
    avatar,
    photos,
    coverPhoto,
    firstName,
    lastName,
    age,
    bio,
    location,
    maleFemale,
    profession,
    contactNumber,
    pet,
    defaultPetUrl,
    userPetInfo: {
      name: petName,
      petsGender: petGender,
      breed: breed,
      age: petAge,
      behavior: "",
    },
    friends: [],
  };

  return dataObj;
}

export default defaultUser;
