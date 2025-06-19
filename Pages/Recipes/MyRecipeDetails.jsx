import React from "react";
import { Link, useParams } from "react-router-dom";
import DefaultImage from "../../src/assets/default-recipe.png";
import Loader from "../../Components/Loading";
import { getUserRecipeById } from "../../api";
import Error from "../../Components/Error";
import { getAuth } from "firebase/auth";

export default function MyRecipeDetails() {
  const params = useParams();
  const [userRecipe, setUserRecipe] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const auth = getAuth();

  React.useEffect(() => {
    async function fetchRecipe() {
      setLoading(true);
      try {
        const userId = auth.currentUser?.uid;

        if (!userId) {
          throw new Error("User not logged in");
        }

        const fetchedRecipe = await getUserRecipeById(params.id, userId);
        setUserRecipe(fetchedRecipe);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [params.id]);

  if (error) {
    return <Error message={error.message} />;
  }

  if (loading) return <Loader />;
  if (!userRecipe) return <p>Recipe not found</p>;

  const ingredients = userRecipe.ingredients?.map((ing) => (
    <li key={ing.id}>{ing.name}</li>
  ));

  const steps = userRecipe.steps?.map((step) => (
    <li key={step.id}>{step.step}</li>
  ));

  function capitaliseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <>
      <div className="myrecipedetail-link">
        <Link to=".." relative="path" className="back-button">
          &larr;Back to my recipes
        </Link>
      </div>
      <article className="image-section">
        <div className="image-container addrecipe-image">
          {
            <img
              className="recipe-image"
              src={userRecipe.image ? userRecipe.image : DefaultImage}
              alt={userRecipe.title}
            />
          }
        </div>
      </article>

      <article className="description-article">
        <div className="description-section">
          <div className="title adddetails-title">
            <h1 className="myrecipe-title">
              {capitaliseFirstLetter(userRecipe.title)}
            </h1>
            <p>{capitaliseFirstLetter(userRecipe.description)}</p>
          </div>

          <div className="direction-container addrecipe-dircontainer">
            <div className="ingredient-container">
              <div className="list-items">
                <h1 className="listitems-Ing">Ingredients</h1>
                <ol>{ingredients}</ol>
              </div>
            </div>

            <div className="recipe-instructions">
              <h1>Directions</h1>
              <ol>{steps}</ol>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
