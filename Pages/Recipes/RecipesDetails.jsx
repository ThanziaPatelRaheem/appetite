import React from "react";
import { useParams, useLocation } from "react-router-dom";
import RecipeDetailCard from "../../Components/RecipeDetailCard";
import { getRecipe } from "../../api";
import Loader from "../../Components/Loading";

export default function RecipeDetails() {
  const [recipe, setRecipe] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const location = useLocation();
  const params = useParams();

  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  React.useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getRecipe(params.id);
        setRecipe(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, [params.id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <>
      <section className="recipe-detail-section">
        {recipe ? (
          <RecipeDetailCard recipe={recipe} location={search} type={type} />
        ) : (
          <h1>Loading</h1>
        )}
      </section>
    </>
  );
}
