import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/actions/DarkModeActions";

const useDarkMode = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const toggleDarkModeHandler = () => {
    dispatch(toggleDarkMode()); // Dispatching toggleDarkMode action
  };
  return [darkMode, toggleDarkModeHandler];
};

export default useDarkMode;
