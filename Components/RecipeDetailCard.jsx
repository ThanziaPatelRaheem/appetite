import React from "react";
import { PiBowlSteamFill } from "react-icons/pi";
import { RxLapTimer } from "react-icons/rx";
import { Link } from "react-router-dom";
import DefaultRecipe from "../src/assets/default-recipe.png";
import Loader from "./Loading";

export default function RecipeDetailCard(props) {
  const [loadingImage, setLoadingImage] = React.useState(true);
  let recipe = props.recipe;

  const ingredients = recipe.ingredients.map((ing, index) => (
    <li key={index}>{ing}</li>
  ));
  const directions = recipe.steps.map((step, index) => (
    <li key={index}>{step}</li>
  ));

  // const nutrition = recipe.nutritionalInfo.map((nutri, index) => (
  //   <li key={index}>{nutri}</li>
  // ));

  return (
    <>
      <div className="back-btn-container">
        <Link
          to={`..${props.location}`}
          relative="path"
          className="back-button"
        >
          &larr;Back to {props.type} recipes
        </Link>
      </div>
      <article className="image-section">
        <div className="image-container">
          <img
            className="recipe-image"
            src={recipe.imageUrlFull ? recipe.imageUrlFull : DefaultRecipe}
            alt="recipe-details"
            onLoad={() => setLoadingImage(false)}
            style={{ display: loadingImage ? "none" : "block" }}
          />
        </div>
      </article>

      <article className="description-article">
        <div className="description-section">
          <div className="title">
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <div className="title-details">
              <div className="detail-icons">
                <div>
                  <PiBowlSteamFill className="icon-serving" />
                </div>
                <p>Serving - {recipe.serving}</p>
              </div>

              <div className="detail-icons">
                <div>
                  <RxLapTimer className="icon-recipe" />
                </div>
                <p>Time - {recipe.time}</p>
              </div>
            </div>
          </div>

          <div className="direction-container">
            <div className="ingredient-container">
              <div className="list-items">
                <h4>Ingredients</h4>
                <ol> {ingredients}</ol>
              </div>

              <div className="nuttri-info">
                <h4>Nutritional Info</h4>
                <ol>
                  <li>Calories:{recipe.nutritionalInfo[0]} kcal</li>
                  <li>Fat:{recipe.nutritionalInfo[1]}g</li>
                  <li>Protien:{recipe.nutritionalInfo[2]}g</li>
                </ol>
              </div>
            </div>
            <div className="recipe-instructions">
              <h4>Directions</h4>
              <ol> {directions}</ol>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
