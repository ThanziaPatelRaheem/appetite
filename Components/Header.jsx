import React from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import logoImg from "../src/assets/logoIcon.png";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
  const [logged, setLogged] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  const [error, setError] = React.useState("");

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#878787",
  };

  const auth = getAuth();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const stopListening = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
    return stopListening;
  }, [location, navigate]);

  function loginHandler() {
    navigate("/login");
  }
  function logoutHandler() {
    signOut(auth)
      .then(() => {
        navigate("/", {
          state: { message: "You have been logged out successfully!" },
        });
      })
      .catch(() => {
        setError("Something went wrong while logging out. Please try again.");
      });
  }
  function toggleHamburger() {
    setToggle((prev) => !prev);
  }
  return (
    <>
      <header className="header ">
        <div className="logo-link">
          <Link to="/">
            <img className="image-logo" src={logoImg} alt="logo" />
            Appetite
          </Link>
        </div>
        <button
          className="hamburger"
          aria-label="toggle navigation"
          onClick={toggleHamburger}
        >
          <GiHamburgerMenu className="hamburger-icon" />
        </button>

        <nav className={toggle ? "mobile-nav nav-open" : "desktop-nav"}>
          <NavLink
            className="nav-link"
            style={({ isActive }) => (isActive ? activeStyles : null)}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="nav-link"
            style={({ isActive }) => (isActive ? activeStyles : null)}
            to="recipes"
          >
            Recipes
          </NavLink>
          <NavLink
            className="nav-link"
            style={({ isActive }) => (isActive ? activeStyles : null)}
            to="addrecipe"
          >
            Add Recipe
          </NavLink>
          <div className="login-btn mobile-login">
            {!logged && (
              <button onClick={loginHandler} className="login-button">
                Login
              </button>
            )}
            {logged && (
              <button onClick={logoutHandler} className="login-button">
                Log out
              </button>
            )}
          </div>
        </nav>

        <div className="login-btn desktop-login">
          {!logged && (
            <button onClick={loginHandler} to="login" className="login-button">
              Login
            </button>
          )}
          {logged && (
            <button onClick={logoutHandler} className="login-button">
              Log out
            </button>
          )}
        </div>
        {error && <div className="logout-error-message">{error}</div>}
      </header>
    </>
  );
}
