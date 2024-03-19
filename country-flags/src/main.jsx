import React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { createRoot } from "react-dom/client";
import FlagReducer from "./redux/reducers/FlagsReducer";
import DarkModeReducer from "./redux/reducers/DarkModeReducer";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const rootReducer = combineReducers({
  darkMode: DarkModeReducer,
  flags: FlagReducer,
});

const store = createStore(rootReducer);
const rootElement = document.getElementById("root");

const app = (
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);

// Create a root instance and render the app
const root = createRoot(rootElement); // Using createRoot from react-dom/client
root.render(app);
