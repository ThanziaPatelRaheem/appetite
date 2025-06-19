import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const activeStyles = {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#878787",
  };
  return (
    <>
      <nav className="admin-nav">
        <NavLink
          end
          to="."
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Add Recipes
        </NavLink>
        <NavLink
          to="/addrecipe/my-recipes"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          My Recipes
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
