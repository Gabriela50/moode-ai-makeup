import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.js";
import "../data/looks.js";
import "../ai/ai-engine.js";
import "./output.css";

function MoodeRoot() {
  return React.createElement("div", {
    dangerouslySetInnerHTML: { __html: App() }
  });
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(React.createElement(MoodeRoot));
}

let currentLanguage = localStorage.getItem("moodeLanguage") || "es";
let cameraStream = null;
let selectedMood = "";
let photoCaptured = false;
let currentLook = null;

const translations = {
  es: {
    navHome: "Inicio",
    navScanner: "Scanner",
    navLooks: "Looks",
    navProfile: "Perfil",
    homeTitle: "Tu mood. Tu estilo.",
    homeDescription: "Descubre el maquillaje que mejor representa cómo quieres sentirte hoy.",
    homeStart: "Descubrir mi look ✦",
    profileLabel: "MI PERFIL",
    profileTitle: "Mi estilo MOODÉ",
    profileDescription: "Guarda tus preferencias de belleza y descubre recomendaciones personalizadas.",
    profileMoods: "✦ Mis moods favoritos",
    profileLooks: "♡ Mis looks guardados",
    profilePreferences: "✨ Mis preferencias",
    savedCollection: "Tu colección personal",
    savedHeading: "Looks guardados",
    savedDescription: "Tus ideas favoritas de maquillaje, reunidas en un solo lugar.",
    savedEmptyHeading: "Tu colección empieza aquí",
    savedEmptyDescription: "Cuando guardes tus looks favoritos, aparecerán en esta sección.",
    savedCreate: "Crear un look",
    scannerTitle: "Analiza tu look",
    scannerDescription: "Elige tu mood, captura una foto y descubre una recomendación de maquillaje.",
    moodTitle: "¿Cómo quieres sentirte hoy?",
    moodRadiant: "Radiante",
    moodElegant: "Elegante",
    moodRomantic: "Romántica",
    moodCalm: "Tranquila",
    noMood: "Aún no has seleccionado un mood.",
    cameraInactive: "Activa la cámara para comenzar.",
    startCamera: "Activar cámara",
    capturePhoto: "Capturar rostro ✦",
    photoRequired: "Primero activa la cámara.",
    generateLook: "Generar mi recomendación ✦",
    chooseMood: "Primero selecciona tu mood.",
    takePhoto: "Primero activa la cámara y captura tu foto.",
    cameraActive: "Cámara activa. Mira al centro.",
    cameraError: "No se pudo abrir la cámara. Revisa los permisos del navegador.",
    photoSuccess: "Foto capturada correctamente.",
    captureDone: "Captura completada.",
    selectedMood: "Tu mood seleccionado:",
    palette: "Paleta de colores",
    finish: "Acabado",
    products: "Productos sugeridos",
    saveLook: "Guardar este look ♡",
    savedSuccess: "¡Look guardado en tu colección!",
    aiNote: "Recomendación basada en tu mood. La foto se captura en tu navegador; todavía no se analizan automáticamente los rasgos faciales.",
    savedEmpty: "Aún no tienes looks guardados.",
    savedTitle: "Looks guardados"
  },
  en: {
    navHome: "Home",
    navScanner: "Scanner",
    navLooks: "Looks",
    navProfile: "Profile",
    homeTitle: "Your mood. Your style.",
    homeDescription: "Discover the makeup that best reflects how you want to feel today.",
    homeStart: "Discover my look ✦",
    profileLabel: "MY PROFILE",
    profileTitle: "My MOODÉ style",
    profileDescription: "Save your beauty preferences and discover personalized recommendations.",
    profileMoods: "✦ My favorite moods",
    profileLooks: "♡ My saved looks",
    profilePreferences: "✨ My preferences",
    savedCollection: "Your personal collection",
    savedHeading: "Saved looks",
    savedDescription: "Your favorite makeup ideas, gathered in one place.",
    savedEmptyHeading: "Your collection starts here",
    savedEmptyDescription: "When you save your favorite looks, they will appear in this section.",
    savedCreate: "Create a look",
    scannerTitle: "Explore your look",
    scannerDescription: "Choose your mood, take a photo, and discover a makeup recommendation.",
    moodTitle: "How do you want to feel today?",
    moodRadiant: "Radiant",
    moodElegant: "Elegant",
    moodRomantic: "Romantic",
    moodCalm: "Calm",
    noMood: "You haven't selected a mood yet.",
    cameraInactive: "Activate the camera to begin.",
    startCamera: "Start camera",
    capturePhoto: "Capture face ✦",
    photoRequired: "Start the camera first.",
    generateLook: "Generate my recommendation ✦",
    chooseMood: "Please select your mood first.",
    takePhoto: "Start the camera and capture a photo first.",
    cameraActive: "Camera active. Look at the center.",
    cameraError: "Could not open the camera. Check browser permissions.",
    photoSuccess: "Photo captured successfully.",
    captureDone: "Capture complete.",
    selectedMood: "Your selected mood:",
    palette: "Color palette",
    finish: "Finish",
    products: "Suggested products",
    saveLook: "Save this look ♡",
    savedSuccess: "Look saved to your collection!",
    aiNote: "Recommendation based on your mood. The photo is captured in your browser; facial features are not automatically analyzed yet.",
    savedEmpty: "You haven't saved any looks yet.",
    savedTitle: "Saved looks"
  }
};

const moodNames = {
  Radiante: { es: "Radiante", en: "Radiant" },
  Elegante: { es: "Elegante", en: "Elegant" },
  Romántica: { es: "Romántica", en: "Romantic" },
  Tranquila: { es: "Tranquila", en: "Calm" }
};

function t(key) {
  return translations[currentLanguage][key] || translations.es[key] || key;
}

function applyLanguage() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (t(key) !== key) element.textContent = t(key);
  });

  const languageButton = document.getElementById("languageToggle");
  if (languageButton) {
    languageButton.textContent = currentLanguage === "es" ? "EN" : "ES";
    languageButton.setAttribute("aria-label", currentLanguage === "es" ? "Switch to English" : "Cambiar a español");
  }

  const moodMessage = document.getElementById("selectedMood");
  if (moodMessage) {
    moodMessage.textContent = selectedMood
      ? `${t("selectedMood")} ${moodNames[selectedMood][currentLanguage]} ✦`
      : t("noMood");
  }

  document.documentElement.lang = currentLanguage;
  renderSavedLooks();
}

function showPage(page) {
  const pages = {
    home: document.getElementById("homePage"),
    scanner: document.getElementById("scannerPage"),
    saved: document.getElementById("savedPage"),
    profile: document.getElementById("profilePage")
  };

  Object.entries(pages).forEach(([name, element]) => {
    if (element) element.classList.toggle("hidden", name !== page);
  });

  if (page === "saved") renderSavedLooks();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function startCamera() {
  const video = document.getElementById("camera");
  const canvas = document.getElementById("photoCanvas");
  const message = document.getElementById("cameraMessage");

  if (!video || !message) return;

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    message.textContent = t("cameraError");
    return;
  }

  try {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
    }

    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false
    });

    video.srcObject = cameraStream;
    video.classList.remove("hidden");
    if (canvas) canvas.classList.add("hidden");
    photoCaptured = false;

    const status = document.getElementById("photoStatus");
    if (status) status.textContent = t("photoRequired");
    message.textContent = t("cameraActive");
  } catch (error) {
    console.error("Error al abrir la cámara:", error);
    message.textContent = t("cameraError");
  }
}

function capturePhoto() {
  const video = document.getElementById("camera");
  const canvas = document.getElementById("photoCanvas");
  const status = document.getElementById("photoStatus");
  const message = document.getElementById("cameraMessage");

  if (!video || !canvas || !status || !message) return;

  if (!cameraStream || !video.videoWidth) {
    status.textContent = t("takePhoto");
    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext("2d");
  context.save();
  context.translate(canvas.width, 0);
  context.scale(-1, 1);
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  context.restore();

  canvas.classList.remove("hidden");
  video.classList.add("hidden");
  photoCaptured = true;
  status.textContent = t("photoSuccess");
  message.textContent = t("captureDone");
}

function selectMood(mood) {
  selectedMood = mood;

  document.querySelectorAll(".moodChoice").forEach((button) => {
    const active = button.dataset.mood === mood;
    button.classList.toggle("bg-pink-200", active);
    button.classList.toggle("ring-2", active);
    button.classList.toggle("ring-pink-400", active);
    button.setAttribute("aria-pressed", String(active));
  });

  const message = document.getElementById("selectedMood");
  if (message) {
    message.textContent = `${t("selectedMood")} ${moodNames[mood][currentLanguage]} ✦`;
  }
}

function generateLook() {
  const recommendation = document.getElementById("recommendation");
  if (!recommendation) return;

  if (!selectedMood) {
    recommendation.classList.remove("hidden");
    recommendation.textContent = t("chooseMood");
    return;
  }

  if (!photoCaptured) {
    recommendation.classList.remove("hidden");
    recommendation.textContent = t("takePhoto");
    return;
  }

  const look = window.MOODE_RECOMMENDATIONS?.[selectedMood];
  const aiResult = window.MOODE_AI?.analyze(selectedMood, true);

  if (!look || !aiResult) {
    recommendation.classList.remove("hidden");
    recommendation.textContent = currentLanguage === "es"
      ? "No se pudo generar la recomendación. Comprueba los archivos de looks e IA."
      : "Could not generate the recommendation. Check the looks and AI files.";
    return;
  }

  currentLook = {
    mood: selectedMood,
    title: look.title,
    text: look.text,
    palette: aiResult.palette,
    finish: aiResult.finish,
    products: aiResult.products,
    date: new Date().toISOString()
  };

  const palette = currentLook.palette.join(", ");
  const products = currentLook.products.map((product) => `<li class="mb-1">${product}</li>`).join("");

  recommendation.innerHTML = `
    <p class="text-xs uppercase tracking-widest opacity-60">MOODÉ AI</p>
    <h3 class="text-2xl font-serif mt-2">${currentLook.title}</h3>
    <p class="mt-3">${currentLook.text}</p>
    <p class="mt-4"><strong>${t("palette")}:</strong> ${palette}</p>
    <p class="mt-2"><strong>${t("finish")}:</strong> ${currentLook.finish}</p>
    <p class="mt-4 font-semibold">${t("products")}:</p>
    <ul class="list-disc pl-5 mt-2">${products}</ul>
    <p class="text-xs opacity-60 mt-4">${t("aiNote")}</p>
    <button id="saveCurrentLookButton" type="button" class="moode-gradient mt-5 w-full rounded-full px-5 py-3 font-semibold">${t("saveLook")}</button>
  `;

  recommendation.classList.remove("hidden");
}

function saveCurrentLook() {
  if (!currentLook) return;

  const saved = JSON.parse(localStorage.getItem("moodeSavedLooks") || "[]");
  saved.unshift(currentLook);
  localStorage.setItem("moodeSavedLooks", JSON.stringify(saved.slice(0, 50)));

  const history = JSON.parse(localStorage.getItem("moodeHistory") || "[]");
  history.unshift({
    mood: currentLook.mood,
    title: currentLook.title,
    date: currentLook.date
  });
  localStorage.setItem("moodeHistory", JSON.stringify(history.slice(0, 100)));

  const button = document.getElementById("saveCurrentLookButton");
  if (button) button.textContent = t("savedSuccess");
  renderSavedLooks();
}

function renderSavedLooks() {
  const container = document.getElementById("savedLooksContainer");
  const empty = document.getElementById("savedLooksEmpty");
  if (!container || !empty) return;

  const saved = JSON.parse(localStorage.getItem("moodeSavedLooks") || "[]");
  container.innerHTML = "";

  saved.forEach((look) => {
    const card = document.createElement("article");
    card.className = "rounded-2xl border border-pink-200 p-5 shadow-sm";
    const title = document.createElement("h3");
    title.className = "font-serif text-xl";
    title.textContent = look.title;
    const mood = document.createElement("p");
    mood.className = "mt-2 text-sm opacity-70";
    mood.textContent = `${t("selectedMood")} ${moodNames[look.mood]?.[currentLanguage] || look.mood}`;
    const description = document.createElement("p");
    description.className = "mt-3 text-sm";
    description.textContent = look.text;
    card.append(title, mood, description);
    container.appendChild(card);
  });

  empty.classList.toggle("hidden", saved.length > 0);
  const emptyText = empty.querySelector("p");
  if (emptyText) emptyText.textContent = t("savedEmpty");
  const heading = empty.querySelector("h2");
  if (heading) heading.textContent = t("savedTitle");
}

const savedTheme = localStorage.getItem("moodeTheme");
document.documentElement.classList.toggle("dark", savedTheme === "dark");

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.mood) {
    selectMood(button.dataset.mood);
    return;
  }

  switch (button.id) {
    case "logoButton":
    case "homeButton":
      showPage("home");
      break;
    case "scannerNavButton":
    case "startExperienceButton":
    case "savedGoScanner":
      showPage("scanner");
      break;
    case "savedButton":
      showPage("saved");
      break;
    case "profileButton":
      showPage("profile");
      break;
    case "themeToggle": {
      const isDark = !document.documentElement.classList.contains("dark");
      document.documentElement.classList.toggle("dark", isDark);
      localStorage.setItem("moodeTheme", isDark ? "dark" : "light");
      button.textContent = isDark ? "☀️" : "🌙";
      break;
    }
    case "languageToggle":
      currentLanguage = currentLanguage === "es" ? "en" : "es";
      localStorage.setItem("moodeLanguage", currentLanguage);
      applyLanguage();
      break;
    case "startCameraButton":
      startCamera();
      break;
    case "captureButton":
      capturePhoto();
      break;
    case "generateLookButton":
      generateLook();
      break;
    case "saveCurrentLookButton":
      saveCurrentLook();
      break;
  }
});

const themeButton = document.getElementById("themeToggle");
if (themeButton) {
  themeButton.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

applyLanguage();
