import React from "react";
import { GiCampCookingPot } from "react-icons/gi";

export default function Loader() {
  return (
    <>
      <div className="loading-spinner">
        <GiCampCookingPot className="spinner-icon" />
        <p>"Simmering deliciousness..."</p>
      </div>
    </>
  );
}
