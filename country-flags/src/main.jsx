import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { createRoot } from "react-dom/client"; // Importing createRoot from the correct location
import rootReducer from "./redux/reducers/FlagsReducer";
import App from "./App";

const store = createStore(rootReducer);

const rootElement = document.getElementById("root");

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Create a root instance and render the app
const root = createRoot(rootElement); // Using createRoot from react-dom/client
root.render(app);
