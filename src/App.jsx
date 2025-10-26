import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import FeedPage from "./Pages/FeedPage";
import ProfilePage from "./Pages/ProfilePage";
import AuthLayout from "./Layouts/AuthLayout";
import PostDetailsPage from "./Pages/PostDetailsPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NotFoundPage from "./Pages/NotFoundPage";
import ProtectedRoute from "./Layouts/ProtectedRoute";
import AuthProtectedRoute from "./Layouts/AuthProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <FeedPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "post-details/:id",
          element: (
            <ProtectedRoute>
              <PostDetailsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
    {
      path: "",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: (
            <AuthProtectedRoute>
              <Login />{" "}
            </AuthProtectedRoute>
          ),
        },
        {
          path: "register",
          element: (
            <AuthProtectedRoute>
              <Register />
            </AuthProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      {/* <h2 className="text-4xl text-center text-amber-400 mb-3.5">
        app component
      </h2> */}

      <RouterProvider router={router} />
    </>
  );
}

export default App;
