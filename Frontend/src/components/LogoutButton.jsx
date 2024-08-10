import { API_URL } from "../api";
import { useAppContext } from "../context/AppContext";
import { logout } from "../Slices/UserSlices/LoginSlice";
import { useDispatch, useSelector } from "react-redux";

const LogoutButton = () => {
	const dispatch = useDispatch();

  const { showToast } = useAppContext();
  const logoutfun = () => {
    dispatch(logout());
  };
  const handleClick = () => {
    logoutfun();
  };
  return (
    <button
      onClick={handleClick}
      className="text-lg bg-lightgreen py-1 px-6 text-white font-semibold font-grotesk rounded-lg  hover:bg-lightred  hover:text-black transition-all"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
