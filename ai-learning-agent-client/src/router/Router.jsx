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
import StartQuiz from "../pages/dashboard/start-quiz/StartQuiz";
import LearningStatistics from "../pages/dashboard/learning-statistics/LearningStatistics";
import FavouriteTopics from "../pages/dashboard/favourite-topics.jsx/FavouriteTopics";
import AiContent from "../pages/dashboard/ai-content/AiContent";
import CompletedQuizes from "../pages/dashboard/completed-quizes/CompletedQuizes";
import ViewUserActivity from "../pages/dashboard/view-user-activity/ViewUserActivity";
import ViewGeneratedContent from "../pages/dashboard/view-generated-content/ViewGeneratedContent";
import ViewQuizStatistics from "../pages/dashboard/view-quiz-statistics/ViewQuizStatistics";
import PendingPage from "../pages/error-pages/PendingPage";
import ContactRequests from "../pages/dashboard/contact-requests/ContactRequests";

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
            <About></About>
          </PrivateRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <PrivateRoute>
            <ContactUs></ContactUs>
          </PrivateRoute>
        ),
      },
      {
        path: "pending",
        element: (
          <PrivateRoute>
            <PendingPage></PendingPage>
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
        path: "view-user-activity",
        element: (
          <AdminRoute>
            <ViewUserActivity />
          </AdminRoute>
        ),
      },
      {
        path: "contact-requests",
        element: (
          <AdminRoute>
            <ContactRequests />
          </AdminRoute>
        ),
      },
      {
        path: "view-generated-content",
        element: (
          <AdminRoute>
            <ViewGeneratedContent />
          </AdminRoute>
        ),
      },
      {
        path: "view-quiz-statistics",
        element: (
          <AdminRoute>
            <ViewQuizStatistics />
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
      {
        path: "start-quiz",
        element: (
          <PrivateRoute>
            <StartQuiz />
          </PrivateRoute>
        ),
      },
      {
        path: "learning-statistics",
        element: (
          <PrivateRoute>
            <LearningStatistics />
          </PrivateRoute>
        ),
      },
      {
        path: "favourite-topics",
        element: (
          <PrivateRoute>
            <FavouriteTopics />
          </PrivateRoute>
        ),
      },
      {
        path: "ai-content",
        element: (
          <PrivateRoute>
            <AiContent />
          </PrivateRoute>
        ),
      },
      {
        path: "completed-quizes",
        element: (
          <PrivateRoute>
            <CompletedQuizes />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;
