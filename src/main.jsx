import React from "react";
import { createRoot } from "react-dom/client";

const route = window.location.pathname.replace(/\/+$/, "") || "/";

async function boot() {
  const root = createRoot(document.getElementById("root"));

  if (route === "/academy") {
    const { default: AcademyPage } = await import("./v2/AcademyPage.jsx");
    root.render(
      <React.StrictMode>
        <AcademyPage />
      </React.StrictMode>
    );
    return;
  }

  const { default: V2App } = await import("./v2/App.jsx");
  root.render(
    <React.StrictMode>
      <V2App />
    </React.StrictMode>
  );
}

boot();
