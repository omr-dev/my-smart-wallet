import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-eikyrwwd.us.auth0.com" //TODO: fix as env variable
    clientId="6u6nlonLcKY5f8Sy1tITBsxYTboyBoT7" //TODO: fix as env variable
    redirectUri={window.location.origin}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);
