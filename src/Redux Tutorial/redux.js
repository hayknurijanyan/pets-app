import React from "react";
import { createStore } from "redux ";
let log = console.log;

// this  is  an  action
const incrementAction = () => {
  return {
    type: "INCREMENT",
  };
};

// this is  an  action
const decrementAction = () => {
  return {
    type: "DECREMENT",
  };
};

// obj={
//   name,
//   sur
// }

// this is a reduser we can have multiple
const counterReduser = (state = obj, action) => {
  switch (action.type) {
    case "INCREMENT":
      return (state.name = 5 + 1);
    case "DECREMENT":
      return state - 1;
  }
};
// we are then creating a store passing a reduser
const store = createStore(counterReduser);

// Displaying in the console (not using in the react-redux)
store.subscribe(() => log(store.getState()));

// Dispatch: for Dispatching we call dispatch and give the action

store.dispatch(incrementAction());

/// we separate each reduser and action on separate files

import { combineRedusers } from "reduxs"; // this is for combining multyple redusers
