import { FaBox, FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../hooks/useTheme";
import { Link, useNavigate } from "react-router";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  console.log(user);
  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    logOut()
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <FaBox />
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-lg"
          >
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              {user ? (
                <span onClick={() => handleLogout()}>Logout</span>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>

        <div className="px-6 py-5 sm:px-10 lg:px-16">
          <Logo />
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            {user ? (
              <span onClick={() => handleLogout()}>Logout</span>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <button
          onClick={handleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <FaMoon className="text-lg" />
          ) : (
            <FaSun className="text-lg" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
