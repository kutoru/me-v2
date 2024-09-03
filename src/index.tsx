import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./static/index.css";
import App from "./components/App";
import PageType from "./types/PageType";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App pageType={PageType.Me} />,
    errorElement: <App pageType={PageType.Error} />,
  },
  {
    path: "/projects",
    element: <App pageType={PageType.Projects} />,
    errorElement: <App pageType={PageType.Error} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
