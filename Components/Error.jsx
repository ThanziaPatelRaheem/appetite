import React from "react";

export default function Error(props) {
  return (
    <>
      <div className="error-message">
        <h2>There was an error</h2>
        <p>{props.message || "Something went wrong.Please try again"}</p>
      </div>
    </>
  );
}
