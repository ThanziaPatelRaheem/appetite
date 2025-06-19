import React from "react";
import { useSearchParams } from "react-router-dom";
import RecipeCard from "../../Components/RecipeCard";
import Button from "../../Components/Button";
import Loader from "../../Components/Loading";
import Error from "../../Components/Error";
import { getRecipesPaginated } from "../../api";

export default function Recipe() {
  const [recipes, setRecipes] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageDocs, setPageDocs] = React.useState([null]);
  const [loadMore, setLoadMore] = React.useState(true);
  const [isEmptyPage, setIsEmptyPage] = React.useState(false);

  const mealType = searchParams.get("mealType");

  React.useEffect(() => {
    async function loadRecipes() {
      setLoading(true);
      setIsEmptyPage(false);
      try {
        const lastDoc = pageDocs[currentPage - 1];
        const { recipes: newRecipes, lastVisible } = await getRecipesPaginated(
          lastDoc,
          8,
          mealType
        );

        if (newRecipes.length === 0) {
          setIsEmptyPage(true);
        }

        setRecipes(newRecipes);
        setPageDocs((prevDocs) => {
          const updateDocs = [...prevDocs];
          updateDocs[currentPage] = lastVisible;
          return updateDocs;
        });

        setLoadMore(!!lastVisible);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadRecipes();
  }, [currentPage, mealType]);

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }
  function clearAllFIlters() {
    setSearchParams({});
  }

  const recipeElements = recipes.map((recipe) => (
    <RecipeCard
      key={recipe.id}
      recipe={recipe}
      search={searchParams}
      filter={mealType}
    />
  ));

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error.message} />;
  }
  return (
    <>
      <section className="filter-section">
        <Button
          search={handleFilterChange}
          clear={clearAllFIlters}
          filter={mealType}
        />
      </section>
      <section className="recipe-cards">
        {isEmptyPage && <p className="no-recipes">No recipes to show.</p>}
        {!isEmptyPage && recipeElements}
      </section>

      <div className="pagination-controls">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          ← Prev
        </button>
        <button
          disabled={!loadMore}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next →
        </button>
      </div>
      {!loadMore && recipes.length > 0 && (
        <p className="no-recipes">No more recipes.</p>
      )}
    </>
  );
}
