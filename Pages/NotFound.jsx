import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="notfound-container">
        <h1>Sorry, the page you are looking for is not found</h1>
        <Link to="/" className="link-button">
          Return to home
        </Link>
      </div>
    </>
  );
}
