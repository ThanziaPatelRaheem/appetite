import React from "react";
import { useNavigate } from "react-router-dom";
import { addUserRecipe, uploadRecipeImage } from "../api";
import { getAuth } from "firebase/auth";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export default function AddRecipe() {
  const [addrecipe, setAddRecipe] = React.useState({
    title: "",
    description: "",
    image: "",
    ingredients: [],
    steps: [],
  });

  const [image, setImage] = React.useState(null);
  const [imageFile, setImageFile] = React.useState(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const recipeTitle =
    addrecipe.title.charAt(0).toUpperCase() + addrecipe.title.slice(1);

  const recipeDescription =
    addrecipe.description.charAt(0).toUpperCase() +
    addrecipe.description.slice(1);

  const navigate = useNavigate();

  const [addIngredient, setAddIngredient] = React.useState("");
  const [addSteps, setAddSteps] = React.useState("");

  function deleteIngredient(id) {
    setAddRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((ing) => ing.id !== id),
    }));
  }

  function deleteSteps(id) {
    setAddRecipe((prev) => ({
      ...prev,
      steps: prev.steps.filter((st) => st.id !== id),
    }));
  }

  const ingredientList = addrecipe.ingredients.map((ing) => {
    const capitalizeName = ing.name.charAt(0).toUpperCase() + ing.name.slice(1);
    return (
      <li key={ing.id}>
        <span className="ingredient-item">
          {capitalizeName}
          <button onClick={() => deleteIngredient(ing.id)}>
            <MdDelete className="del-icon" />
          </button>
        </span>
      </li>
    );
  });

  const stepsList = addrecipe.steps.map((st) => {
    const capitaliseStep = st.step.charAt(0).toUpperCase() + st.step.slice(1);
    return (
      <li key={st.id}>
        <span className="step-item">
          {capitaliseStep}
          <button onClick={() => deleteSteps(st.id)}>
            <MdDelete className="del-icon" />
          </button>
        </span>
      </li>
    );
  });

  async function onSubmitHanlder(e) {
    e.preventDefault();
    if (!addrecipe.title) {
      setError("Title can't be empty");
      return;
    }
    if (!addrecipe.description) {
      setError("Description can't be empty");
      return;
    }

    if (addrecipe.ingredients.length === 0) {
      setError("Add Ingredients");
      return;
    }
    if (addrecipe.steps.length === 0) {
      setError("Add Directions");
      return;
    }

    setLoading(true);

    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (!userId) {
      setError("User not authenticated.Please log in again");
      setLoading(false);
      return;
    }

    let imageUrl = "";

    if (imageFile) {
      imageUrl = await uploadRecipeImage(imageFile);
    }

    const newRecipeObj = {
      ...addrecipe,
      image: imageUrl,
      createdAt: new Date(),
    };
    try {
      await addUserRecipe(newRecipeObj, userId);
      navigate("/addrecipe/my-recipes");
    } catch (err) {
      setError("Failed to save recipe.Try again");
    } finally {
      setLoading(false);
    }
  }

  function onHandleChange(e) {
    const { value, name } = e.currentTarget;
    setAddRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  }

  function imageHandler(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleIngredient(e) {
    e.preventDefault();
    const newIngredient = e.target.value;

    setAddIngredient(newIngredient);
  }

  function submitIngredientHandler(e) {
    e.preventDefault();
    if (!addIngredient.trim()) return;
    setAddRecipe((prevIng) => ({
      ...prevIng,
      ingredients: [
        ...prevIng.ingredients,
        { id: Date.now(), name: addIngredient.trim() },
      ],
    }));
    setAddIngredient("");
  }

  function onHandleSteps(e) {
    const stepsValue = e.target.value;
    setAddSteps(stepsValue);
  }

  function handleSteps(e) {
    e.preventDefault();
    const newSteps = addSteps;
    if (!addSteps.trim()) return;
    setAddRecipe((prevSteps) => ({
      ...prevSteps,
      steps: [
        ...prevSteps.steps,
        {
          id: Date.now(),
          step: newSteps.trim(),
        },
      ],
    }));
    setAddSteps("");
  }

  return (
    <>
      {error && <section className="form-error">{error}</section>}

      <section className="recipe-details">
        <div className="addrecipe-container">
          <form className="addrecipe-form" onSubmit={onSubmitHanlder}>
            <div className="form-title">
              <h1>Add your recipes</h1>
            </div>
            <div className="form-input">
              <label htmlFor="title">Title:</label>
              <input
                id="title"
                type="text"
                name="title"
                value={addrecipe.title}
                onChange={onHandleChange}
                placeholder="eg:Banana Pancakes"
              ></input>
            </div>
            <div className="recipe-title">
              <h1> {recipeTitle}</h1>
            </div>
            <div className="form-input ">
              <label htmlFor="description">Description:</label>
              <input
                id="description"
                type="text"
                name="description"
                value={addrecipe.description}
                onChange={onHandleChange}
                placeholder="A simple breaskfast recipe"
              />
            </div>
            <div className="recipe-description">
              <p> {recipeDescription}</p>
            </div>
            <div className="form-input form-input-image">
              <h4>Upload Image:</h4>
              <label htmlFor="image" className="custom-label">
                choose file
              </label>
              <input
                className="image-input"
                id="image"
                type="file"
                accept="image/*"
                name="image"
                onChange={imageHandler}
              />
              {image && (
                <div>
                  <img
                    className="add-recipe-image"
                    src={image}
                    alt="recipe-image"
                  />
                </div>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="ingredients">Ingredients:</label>
              <input
                type="text"
                name="ingredients"
                placeholder="e.g:Banana"
                onChange={handleIngredient}
                value={addIngredient}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    submitIngredientHandler(e);
                  }
                }}
              />
              <div className="steps-button">
                <button onClick={submitIngredientHandler}>
                  <IoIosAddCircle className="add-icon" />
                </button>
              </div>
            </div>
            <div className="ingredient-list">
              <ol>{ingredientList}</ol>
            </div>
            <div className="form-input-container">
              <div className="form-input">
                <label htmlFor="steps">Directions:</label>
                <input
                  type="text"
                  name="steps"
                  placeholder="Mash the bananas in the bowl"
                  onChange={onHandleSteps}
                  value={addSteps}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSteps(e);
                    }
                  }}
                />
                <div className="steps-button">
                  <button onClick={handleSteps}>
                    <IoIosAddCircle className="add-icon" />
                  </button>
                </div>
              </div>
            </div>
            <div className="direction-list">
              <ol>{stepsList}</ol>
            </div>
            <div className="button-container">
              <button
                type="submit"
                disabled={loading}
                className="submit-button"
              >
                {loading ? "Adding..." : "Add Recipe"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
