import React from "react";
import { createRoot } from "react-dom/client";

const route = window.location.pathname.replace(/\/+$/, "") || "/";

async function boot() {
  const rootEl = document.getElementById("root");
  if (!rootEl) {
    console.error("Missing #root");
    return;
  }

  const root = createRoot(rootEl);

  try {
    if (route === "/academy") {
      const { default: AcademyPage } = await import("./v2/AcademyPage.jsx");
      root.render(
        <React.StrictMode>
          <AcademyPage />
        </React.StrictMode>
      );
      return;
    }

    if (route === "/case-studies") {
      const { default: CaseStudiesPage } = await import("./v2/CaseStudiesPage.jsx");
      root.render(
        <React.StrictMode>
          <CaseStudiesPage />
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
  } catch (error) {
    console.error("Failed to boot app", error);
    rootEl.innerHTML =
      "<main style='min-height:100vh;display:grid;place-items:center;background:#050506;color:#fff;font-family:system-ui,sans-serif'><p>Something went wrong loading this page.</p></main>";
  }
}

boot();
