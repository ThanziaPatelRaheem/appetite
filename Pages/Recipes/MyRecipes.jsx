import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../src/assets/default-recipe.png";
import { deleteUserRecipe, getUserRecipes } from "../../api";
import Loader from "../../Components/Loading";
import { getAuth } from "firebase/auth";
import { MdDelete } from "react-icons/md";

export default function MyRecipes() {
  const auth = getAuth();
  const [userRecipes, setUserRecipes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchRecipes() {
      const userId = auth.currentUser?.uid;

      if (!userId) {
        console.error("User not logged in");
        return;
      }

      const recipes = await getUserRecipes(userId);
      setUserRecipes(recipes);
      setLoading(false);
    }
    fetchRecipes();
  }, []);

  async function removerHandler(idToRemove) {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert("You must be logged in to delete recipes.");
      return;
    }
    await deleteUserRecipe(idToRemove, userId);
    setUserRecipes((prev) => prev.filter((item) => item.id !== idToRemove));
  }

  if (loading) return <Loader />;

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <>
      <section className="listed-recipes">
        <h1 className="recipe-list">Your listed recipes...</h1>
        {userRecipes.length === 0 ? (
          <p>No recipes added yet.</p>
        ) : (
          <div className="saved-recipes">
            {userRecipes.map((recipe, index) => (
              <article key={recipe.id || index} className="recipe-tiles">
                <div className="recipeimage-container">
                  <img
                    className="myrecipe-image"
                    src={recipe.image || defaultImage}
                    alt={recipe.title}
                  />
                  <button onClick={() => removerHandler(recipe.id)}>
                    <MdDelete className="delete-icon" />
                  </button>
                </div>
                <div className="recipelist-info">
                  <h1>{capitalizeFirstLetter(recipe.title)}</h1>
                  <p>{capitalizeFirstLetter(recipe.description)}</p>
                </div>

                <div className="addrecipe-btn">
                  <Link
                    to={`/addrecipe/my-recipes/${recipe.id}`}
                    className="view-recipe-btn"
                  >
                    View Recipe
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
