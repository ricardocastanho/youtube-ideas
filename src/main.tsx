import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/Home.tsx";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>
);
