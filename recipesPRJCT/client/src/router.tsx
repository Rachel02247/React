import { createBrowserRouter } from "react-router"; // Make sure to import Outlet
import About from "./components/about";
import HomePage from "./components/HomePage";
import RecipesList from "./components/recipes/RecipesList";
import AddRecipe from "./components/recipes/AddRecipe";
import AppLayout from "./AppLayout";
import ShowRecipe from "./components/recipes/showRecipe";

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <AppLayout />
            </>
        ),
        children: [
            {
                path: '/home',
                element: <HomePage />,
            },
            {
                path: '/about',
                element: <About />,
                errorElement: <>Error</>
            },
            {
                path: '/recipes',
                element: <RecipesList />,
                errorElement: <h1 style={{ color: "red" }}>ERROR: show all recipes</h1>,

                children: [
                    {
                        path: ':id',
                        element: <ShowRecipe />,
                        errorElement: <h1 style={{ color: "red" }}>ERROR: show recipe</h1>,
                    }
                ]
            },
            {
                path: '/addRecipe',
                element: <AddRecipe />,
                errorElement: <h1 style={{ color: "red" }}>ERROR: add recipe</h1>
            }

        ]
    }
]);
