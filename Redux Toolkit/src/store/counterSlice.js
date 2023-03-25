import { createSlice } from "@reduxjs/toolkit";

const counterInitialState = {
  counter: 0,
  showCounter: true,
};

// Create a Slice of your state
// Lets say you have you have two reducers and you use combineReducer to combine those reducer when you dont use redux toolkit like below.

// export default combineReducers({
//   darkMode: darkModeReducer,
//   user: userReducer,
// });

// Now Create two Slices for darkModeReducer and userReducers as darkModeSlice and userSlice as shown below with counterSlice using createSlice from redux toolkit

// Now createSlice takes three arguments
// 1. name of the slice, It can be any random text.
// 2. InitialState that we passed down to darkModeReducer and userReducer
// 3. reducers object
//     a). reducers object contains all your switch cases as individual functions
// case DarkModeActionTypes.DARK_MODE_TOGGLE: {
//     const stateToBeUpdated = {
//       ...state,
//       isdarkMode: !state.isdarkMode,
//     };

//     return stateToBeUpdated;
//   }

// toggleDarkMode(state) {
// you can mutate the state directly because reduxtoolkit uses immer that takes care of direct state mutations
// state.darkMode = !state.darkMode
// }

export const counterSlice = createSlice({
  name: "counter",
  initialState: counterInitialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// These Actions were used at the time of dispatch.
// counter.actions contains all our action creators
// calling these action creators will returns us action object with unique type as below
// counterSlice.actions.decrement()
// {type: "Some Unique Action Name"}
// counterSlice.actions.increase(10);
// {type: "Some Unique Action Name", payload: 10}
// so we can just call these action creators instead of providing action object manually. This will removes overHead of maintaining unique actionTypes in redux

// so export these counterSlice.actions and import wherever you wanna dispatch the action and use those actionCreators under counterSlice.actions
// lets say dispatch(counterSlice.actions.increase(10)) will gives us dispatch({type: "SOme Unique Identifier", payload: 10})

export const counterActions = counterSlice.actions;
