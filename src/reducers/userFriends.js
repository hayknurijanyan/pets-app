export const USER_FRIENDS = "USER_FRIENDS";

const initialState = {
  user: false,
  isUrl: "",
  userData: {},
  friends: [],
};

const userFriendsReducer = (state = initialState.friends, action) => {
  switch (action.type) {
    case USER_FRIENDS:
      return [...action.payload];

    default:
      return state;
  }
};

export default userFriendsReducer;
