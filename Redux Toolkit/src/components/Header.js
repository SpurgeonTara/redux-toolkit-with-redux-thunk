import classes from "./Header.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const Header = ({ isAuth }) => {
  const dispatch = useDispatch();
  const { logout } = authActions;
  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        {isAuth && (
          <ul>
            <li>
              <a href="/">My Products</a>
            </li>
            <li>
              <a href="/">My Sales</a>
            </li>
            <li>
              <button onClick={() => dispatch(logout())}>Logout</button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
