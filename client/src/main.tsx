import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add fonts
const fontLinks = document.createElement("link");
fontLinks.rel = "stylesheet";
fontLinks.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap";
document.head.appendChild(fontLinks);

// Add title
const title = document.createElement("title");
title.textContent = "Noveloper | No code. No fear. Just flow.";
document.head.appendChild(title);

createRoot(document.getElementById("root")!).render(<App />);
