import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "../Pages/Home";
import Layout from "../Components/Layout";
import Recipe from "../Pages/Recipes/Recipes";
import RecipeDetails from "../Pages/Recipes/RecipesDetails";
import NotFound from "../Pages/NotFound";
import AddRecipe from "../Pages/AddRecipe";
import MyRecipes from "../Pages/Recipes/MyRecipes";
import AdminLayout from "../Components/AdminLayout";
import MyRecipeDetails from "../Pages/Recipes/MyRecipeDetails";
import Login from "../Pages/Login";
import AuthRequired from "../Components/AuthRequired";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="recipes" element={<Recipe />} />
            <Route path="recipes/:id" element={<RecipeDetails />} />
            <Route path="login" element={<Login />} />

            <Route element={<AuthRequired />}>
              <Route path="addrecipe" element={<AdminLayout />}>
                <Route index element={<AddRecipe />} />
                <Route path="my-recipes" element={<MyRecipes />} />
                <Route path="my-recipes/:id" element={<MyRecipeDetails />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
