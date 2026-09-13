import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home";
import RootLayout from "../layouts/RootLayout";
import About from "../pages/about/About";
import ContactUs from "../pages/contact-us/ContactUs";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/authentication/login/Login";
import Signup from "../pages/authentication/signup/Signup";
import DashboardLayout from "../layouts/DashboardLayout";
import Root from "../pages/dashboard/root/Root";
import ViewUsers from "../pages/dashboard/view-users/ViewUsers";
import RecentActivity from "../pages/dashboard/recent-activity/RecentActivity";
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "../routes/AdminRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "about",
        element: (
          <PrivateRoute>
            {" "}
            <About></About>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <PrivateRoute>
            {" "}
            <ContactUs></ContactUs>{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "root", Component: Root },
      {
        path: "view-users",
        element: (
          <AdminRoute>
            <ViewUsers />
          </AdminRoute>
        ),
      },
      {
        path: "recent-activity",
        element: (
          <PrivateRoute>
            <RecentActivity />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;
