import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrandProvider } from "./context/BrandContext";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrandProvider>
      <App />
    </BrandProvider>
  </React.StrictMode>
);
