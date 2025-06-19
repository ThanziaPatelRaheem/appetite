import React from "react";

export default function Button(props) {
  let handleFilterChange = props.search;

  return (
    <>
      <section className="button-compo">
        <div className="filter-btn">
          <button
            className={` btn ${props.filter === "breakfast" ? "clicked" : ""}`}
            onClick={() => handleFilterChange("mealType", "breakfast")}
          >
            Breakfast
          </button>
          <button
            className={` btn ${
              props.filter === "lunch-dinner" ? "clicked" : ""
            }`}
            onClick={() => handleFilterChange("mealType", "lunch-dinner")}
          >
            Lunch/Dinner
          </button>

          <button
            className={` btn ${props.filter === "snacks" ? "clicked" : ""}`}
            onClick={() => handleFilterChange("mealType", "snacks")}
          >
            Snacks
          </button>
          <button
            className={` btn ${props.filter === "dessert" ? "clicked" : ""}`}
            onClick={() => handleFilterChange("mealType", "dessert")}
          >
            Desserts
          </button>
          <button
            className={` btn ${props.filter === "smoothie" ? "clicked" : ""}`}
            onClick={() => handleFilterChange("mealType", "smoothie")}
          >
            Smoothie
          </button>
          <button
            className={` btn ${props.filter === "salad" ? "clicked" : ""}`}
            onClick={() => handleFilterChange("mealType", "salad")}
          >
            Salad
          </button>
        </div>
        {props.filter ? (
          <div>
            <button className="clear-btn" onClick={props.clear}>
              Clear
            </button>
          </div>
        ) : null}
      </section>
    </>
  );
}
