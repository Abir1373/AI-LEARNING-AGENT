import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import Router from "./router/Router";
import ThemeProvider from "./context/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <div className="max-w-7xl mx-auto m-3">
        <RouterProvider router={Router} />
      </div>
    </ThemeProvider>
  </StrictMode>,
);
