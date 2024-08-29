import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./static/index.css";
import App from "./components/App";
import Me from "./components/Me";
import Projects from "./components/Projects";
import ErrorPage from "./components/ErrorPage";

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
