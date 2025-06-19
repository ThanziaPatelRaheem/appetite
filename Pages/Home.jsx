import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const [message, setMessage] = React.useState("");
  React.useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  React.useEffect(() => {
    if (!message) return;
    const removeTimer = setTimeout(() => setMessage(""), 1500);
    return () => {
      clearTimeout(removeTimer);
    };
  }, [message]);

  return (
    <>
      {message && (
        <h3 className={`loggedin-message${message ? "" : "hide"}`}>
          {message}
        </h3>
      )}
      <main className="main-container">
        <div className="main-content">
          <h1>Cook.Save.Savour</h1>
          <p>
            From quick weeknight meals to cozy weekend treats,
            <br /> We bring you recipes with love, not fancy cheats.
          </p>
          <p>Now roll up your sleeves — it's time to feast!</p>

          <Link to="recipes">Recipes</Link>
        </div>
      </main>
    </>
  );
}
