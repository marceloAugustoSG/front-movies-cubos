import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/index";
import LoginPage from "../pages/LoginPage/index";
import RegisterPage from "../pages/RegisterPage/index";
import DashboardPage from "../pages/DashboardPage/index";
import MoviesPageWrapper from "../pages/MoviesPage/MoviesPageWrapper";
import ErrorPage from "../pages/ErrorPage/index";
import ProtectedRoute from "../components/ProtectedRoute/index";
import Layout from "../components/Layout/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <RegisterPage />
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout>
          <DashboardPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/movies",
    element: (
      <ProtectedRoute>
        <MoviesPageWrapper />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
  },
]);

export default router;
