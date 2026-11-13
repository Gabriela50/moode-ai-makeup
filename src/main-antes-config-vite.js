import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.js";
import "./input.css";

function MoodeRoot() {
  return React.createElement("div", {
    dangerouslySetInnerHTML: { __html: App() }
  });
}

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(React.createElement(MoodeRoot));
}

function showPage(page) {
  const pages = {
    home: document.getElementById("homePage"),
    scanner: document.getElementById("scannerPage"),
    saved: document.getElementById("savedPage"),
    profile: document.getElementById("profilePage")
  };

  Object.entries(pages).forEach(([name, element]) => {
    if (element) {
      element.classList.toggle("hidden", name !== page);
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("logoButton")?.addEventListener("click", () => showPage("home"));
document.getElementById("homeButton")?.addEventListener("click", () => showPage("home"));
document.getElementById("scannerNavButton")?.addEventListener("click", () => showPage("scanner"));
document.getElementById("savedButton")?.addEventListener("click", () => showPage("saved"));
document.getElementById("profileButton")?.addEventListener("click", () => showPage("profile"));

document.getElementById("startExperienceButton")?.addEventListener("click", () => {
  showPage("scanner");
  if (typeof window.startCamera === "function") {
    window.startCamera();
  }
});

document.getElementById("captureButton")?.addEventListener("click", () => {
  if (typeof window.capturePhoto === "function") {
    window.capturePhoto();
  }
});

const themeButton = document.getElementById("themeToggle");

function loadTheme() {
  const savedTheme = localStorage.getItem("moodeTheme");
  const isDark = savedTheme === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  if (themeButton) themeButton.textContent = isDark ? "☀️" : "🌙";
}

themeButton?.addEventListener("click", () => {
  const isDark = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem("moodeTheme", isDark ? "dark" : "light");
  themeButton.textContent = isDark ? "☀️" : "🌙";
});

loadTheme();
