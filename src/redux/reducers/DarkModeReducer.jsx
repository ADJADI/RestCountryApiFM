import { TOGGLE_DARK_MODE } from "../actions/DarkModeActions";

const initialState = {
  darkMode: false,
};

const DarkModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};

export default DarkModeReducer;
