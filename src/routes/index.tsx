import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/index";
import LoginPage from "../pages/LoginPage/index";
import RegisterPage from "../pages/RegisterPage/index";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/index";
import ResetPasswordPage from "../pages/ResetPasswordPage/index";
import DashboardPage from "../pages/DashboardPage/index";
import MoviesPage from "../pages/MoviesPage/index";
import MovieDetailsPage from "../pages/MovieDetailsPage/index";
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
    path: "/forgot-password",
    element: (
      <Layout>
        <ForgotPasswordPage />
      </Layout>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <Layout>
        <ResetPasswordPage />
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
        <Layout>
          <MoviesPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/movies/:id",
    element: (
      <ProtectedRoute>
        <MovieDetailsPage />
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
