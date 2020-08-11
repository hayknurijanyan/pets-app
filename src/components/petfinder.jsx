import React from "react";
import { Toolbar } from "@material-ui/core";
import SearchBar from "./searchbar";
import AllPets from "./allpets";

const Petfinder = () => {
  return (
    <div>
      <Toolbar/>
        <SearchBar/>
        <AllPets/>
    </div>
  );
};

export default Petfinder;

// let pets = {
//   pet: dog,
//   breed:
// };
