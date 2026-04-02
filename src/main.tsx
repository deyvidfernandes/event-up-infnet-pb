import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Routes from "./routes/routes.tsx";
import "./global.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Routes />
    <ToastContainer position="top-right" autoClose={3000} />
  </StrictMode>,
);
