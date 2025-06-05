import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import routers from "./routers/routers";
import { RouterProvider } from "react-router";
import "@fontsource/lato/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routers} />
  </StrictMode>
);
