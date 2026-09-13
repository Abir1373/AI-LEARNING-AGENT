import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import Router from "./router/Router";
import ThemeProvider from "./context/ThemeProvider";
import AuthProvider from "./context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserRoleProvider from "./context/UserRoleProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <UserRoleProvider>
            <div className="max-w-7xl mx-auto m-3">
              <RouterProvider router={Router} />
            </div>
          </UserRoleProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
