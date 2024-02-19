import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "./components/Home/home.css";
import "./components/WeddingSpeech/weddingspeechbot.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <html>
      <body>
        <BrowserRouter>
          <Theme
            scaling="100%"
            radius="medium"
            appearance="light"
            accentColor="crimson"
            grayColor="sage"
            panelBackground="translucent"
          >
            <App />
          </Theme>
        </BrowserRouter>
      </body>
    </html>
  </React.StrictMode>
);
