import React from "react";
import { Link } from "react-router-dom";
import DefaultRecipe from "../src/assets/default-recipe.png";
import { RxLapTimer } from "react-icons/rx";

export default function RecipeCard(props) {
  let recipe = props.recipe;
  let searchParams = props.search;

  return (
    <>
      <article className="recipe-tile">
        <div>
          <img
            src={recipe.imageUrl ? recipe.imageUrl : DefaultRecipe}
            alt="recipe-image "
          />
        </div>
        <h1>{recipe.title}</h1>
        <div className="info">
          <div className="info-icon">
            <RxLapTimer className="icon" />
            <p>{recipe.time}</p>
          </div>
          <Link
            to={`${recipe.id}`}
            state={{
              search: `?${searchParams.toString()}`,
              type: props.filter,
            }}
            className="view recipe"
          >
            View Recipe
          </Link>
        </div>
      </article>
    </>
  );
}
