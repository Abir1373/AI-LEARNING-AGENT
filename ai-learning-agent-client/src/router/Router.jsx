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

const Router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "contact", Component: ContactUs },
      { path: "contact", Component: ContactUs },
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
    Component: DashboardLayout,
    children: [
      { path: "root", Component: Root },
      { path: "view-users", Component: ViewUsers },
    ],
  },
]);

export default Router;
