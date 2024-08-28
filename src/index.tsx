import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./components/App/App";
import Me from "./components/Me/Me";
import Projects from "./components/Projects/Projects";
import ErrorPage from "./components/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App content={<Me />} />,
    errorElement: <App content={<ErrorPage />} />,
  },
  {
    path: "/projects",
    element: <App content={<Projects />} />,
    errorElement: <App content={<ErrorPage />} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
