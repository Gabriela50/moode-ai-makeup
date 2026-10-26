import "../ai/ai-engine.js";
import "../data/looks.js";
import { App } from "./App.js";
import "./output.css";
import { supabase } from "./supabase.js";
import { detectFace } from "./face-detection.js";
const rootElement = document.getElementById("root");
if (rootElement) {
  rootElement.innerHTML = App();
}

let currentLanguage = localStorage.getItem("moodeLanguage") || "es";
let cameraStream = null;
let selectedMood = "";
let photoCaptured = false;
let currentLook = null;
let uploadedPhotoUrl = null;

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
    preferencesTitle: "Personaliza tu look",
    preferencesDescription: "Cuéntanos qué necesitas para adaptar tu recomendación.",
    skinTypeLabel: "¿Cuál es tu tipo de piel?",
    skinNormal: "Normal",
    skinDry: "Seca",
    skinOily: "Grasa",
    skinCombination: "Mixta",
    skinToneLabel: "¿Cuál es tu tono de piel?",
    toneLight: "Claro",
    toneMedium: "Medio",
    toneTan: "Moreno",
    toneDeep: "Profundo",
    undertoneLabel: "¿Cuál es tu subtono?",
    undertoneUnknown: "No lo sé",
    undertoneWarm: "Cálido",
    undertoneCool: "Frío",
    undertoneNeutral: "Neutro",
    occasionLabel: "¿Para qué ocasión?",
    occasionDaily: "Día a día",
    occasionWork: "Universidad o trabajo",
    occasionDate: "Cita especial",
    occasionParty: "Fiesta o evento",
    coverageLabel: "¿Qué cobertura prefieres?",
    coverageLight: "Ligera y natural",
    coverageMedium: "Media",
    coverageFull: "Alta",
    styleLabel: "¿Qué estilo te gusta?",
    styleNatural: "Natural",
    styleGlow: "Luminoso y glowy",
    styleElegant: "Elegante",
    styleCreative: "Creativo y atrevido",
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
    faceChecking: "Analizando el rostro...",
    faceDetected: "Rostro detectado. Ya podemos preparar tu look.",
    faceNotDetected: "No encontramos un rostro. Prueba con una foto frontal y buena iluminación.",
    faceDetectionError: "No se pudo analizar el rostro. Puedes intentar otra foto.",
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
    preferencesTitle: "Personalize your look",
    preferencesDescription: "Tell us what you need to tailor your recommendation.",
    skinTypeLabel: "What is your skin type?",
    skinNormal: "Normal",
    skinDry: "Dry",
    skinOily: "Oily",
    skinCombination: "Combination",
    skinToneLabel: "What is your skin tone?",
    toneLight: "Light",
    toneMedium: "Medium",
    toneTan: "Tan",
    toneDeep: "Deep",
    undertoneLabel: "What is your undertone?",
    undertoneUnknown: "I don't know",
    undertoneWarm: "Warm",
    undertoneCool: "Cool",
    undertoneNeutral: "Neutral",
    occasionLabel: "What is the occasion?",
    occasionDaily: "Everyday",
    occasionWork: "University or work",
    occasionDate: "Special date",
    occasionParty: "Party or event",
    coverageLabel: "What coverage do you prefer?",
    coverageLight: "Light and natural",
    coverageMedium: "Medium",
    coverageFull: "Full",
    styleLabel: "What style do you like?",
    styleNatural: "Natural",
    styleGlow: "Glowy",
    styleElegant: "Elegant",
    styleCreative: "Creative and bold",
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
    faceChecking: "Analyzing face...",
    faceDetected: "Face detected. Your look can now be prepared.",
    faceNotDetected: "No face found. Try a front-facing photo with good lighting.",
    faceDetectionError: "The face could not be analyzed. You can try another photo.",
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
function applyAuthLanguage() {
  const copy = {
    es: {
      eyebrow: "BELLEZA A TU MANERA",
      description: "Descubre nuevas formas de expresarte con recomendaciones de maquillaje inspiradas en tu estilo y tu estado de ánimo.",
      featureOne: "Tu estilo",
      featureTwo: "Tus looks",
      featureThree: "Tu mood",
      footer: "TU BELLEZA, TUS REGLAS.",
      welcome: "Bienvenida a tu espacio",
      heading: "Tu próximo look empieza aquí.",
      subheading: "Accede a tu colección personal de belleza.",
      login: "Iniciar sesión",
      signup: "Crear cuenta",
      email: "Correo electrónico",
      password: "Contraseña",
      name: "Tu nombre",
      createPassword: "Crea una contraseña",
      loginSubmit: "Entrar a MOODÉ ↗",
      signupSubmit: "Crear mi cuenta ♡",
      privacy: "Tu espacio personal. Tus preferencias. Tu estilo."
    },
    en: {
      eyebrow: "BEAUTY, YOUR WAY",
      description: "Discover new ways to express yourself with makeup recommendations inspired by your style and mood.",
      featureOne: "Your style",
      featureTwo: "Your looks",
      featureThree: "Your mood",
      footer: "YOUR BEAUTY, YOUR RULES.",
      welcome: "Welcome to your space",
      heading: "Your next look starts here.",
      subheading: "Access your personal beauty collection.",
      login: "Sign in",
      signup: "Create account",
      email: "Email address",
      password: "Password",
      name: "Your name",
      createPassword: "Create a password",
      loginSubmit: "Enter MOODÉ ↗",
      signupSubmit: "Create my account ♡",
      privacy: "Your personal space. Your preferences. Your style."
    }
  };

  const text = copy[currentLanguage];

  const elements = {
    authEyebrow: text.eyebrow,
    authDescription: text.description,
    authFeatureOne: text.featureOne,
    authFeatureTwo: text.featureTwo,
    authFeatureThree: text.featureThree,
    authFooter: text.footer,
    authWelcome: text.welcome,
    authHeading: text.heading,
    authSubheading: text.subheading,
    authShowLogin: text.login,
    authShowSignup: text.signup,
    loginEmailLabel: text.email,
    signupEmailLabel: text.email,
    loginPasswordLabel: text.password,
    signupNameLabel: text.name,
    signupPasswordLabel: text.createPassword,
    loginSubmit: text.loginSubmit,
    signupSubmit: text.signupSubmit,
    authPrivacy: text.privacy
  };

  Object.entries(elements).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (!element) return;

    if (id === "loginSubmit" || id === "signupSubmit") {
      element.textContent = value;
    } else {
      element.textContent = value;
    }
  });

  const authLanguageButton = document.getElementById("authLanguageToggle");
  const languageButton = document.getElementById("languageToggle");

  [authLanguageButton, languageButton].forEach((button) => {
    if (button) {
      button.textContent = currentLanguage === "es" ? "EN" : "ES";
    }
  });

  const authThemeButton = document.getElementById("authThemeToggle");
  const themeButton = document.getElementById("themeToggle");
  const isDark = document.documentElement.classList.contains("dark");

  [authThemeButton, themeButton].forEach((button) => {
    if (button) button.textContent = isDark ? "☀️" : "🌙";
  });
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



async function analyzeCapturedFace(canvas, status, message) {
  if (!canvas || !status || !message) return;

  status.textContent = t("faceChecking");

  try {
    const result = await detectFace(canvas);

    if (result.detected) {
      status.textContent = t("faceDetected");
      message.textContent = t("faceDetected");
    } else {
      status.textContent = t("faceNotDetected");
      message.textContent = t("faceNotDetected");
    }
  } catch (error) {
    console.error("Error al analizar el rostro:", error);
    status.textContent = t("faceDetectionError");
    message.textContent = t("faceDetectionError");
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
  if (!context) return;

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
  void analyzeCapturedFace(canvas, status, message);
}

function loadUploadedPhoto(file) {
  const video = document.getElementById("camera");
  const canvas = document.getElementById("photoCanvas");
  const status = document.getElementById("photoStatus");
  const message = document.getElementById("cameraMessage");

  if (!file || !canvas || !status || !message) return;

  if (!file.type.startsWith("image/")) {
    status.textContent = "Selecciona una imagen válida.";
    return;
  }

  const image = new Image();
  const objectUrl = URL.createObjectURL(file);

  image.onload = () => {
    const maxSize = 1200;
    const scale = Math.min(
      1,
      maxSize / Math.max(image.naturalWidth, image.naturalHeight)
    );

    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);

    const context = canvas.getContext("2d");

    if (!context) {
      URL.revokeObjectURL(objectUrl);
      status.textContent = "No se pudo procesar la foto.";
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    canvas.classList.remove("hidden");
    if (video) video.classList.add("hidden");

    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      cameraStream = null;
    }

    photoCaptured = true;
    status.textContent = currentLanguage === "en"
      ? "Photo selected successfully."
      : "¡Foto seleccionada correctamente!";

    message.textContent = currentLanguage === "en"
      ? "Your selected photo is ready."
      : "Tu fotografía está lista.";

    void analyzeCapturedFace(canvas, status, message);
    URL.revokeObjectURL(objectUrl);
  };

  image.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    status.textContent = currentLanguage === "en"
      ? "Could not load this image."
      : "No se pudo cargar la imagen.";
  };

  image.src = objectUrl;
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

  const look = window.MOODE_RECOMMENDATIONS?.[selectedMood];
  const aiResult = window.MOODE_AI?.analyze(selectedMood, false, currentLanguage);

  if (!look || !aiResult) {
    recommendation.classList.remove("hidden");
    recommendation.textContent = currentLanguage === "es"
      ? "No se pudo generar la recomendación."
      : "Could not generate the recommendation.";
    return;
  }

  const preferences = {
    skinType: document.getElementById("skinType")?.value || "normal",
    skinTone: document.getElementById("skinTone")?.value || "medium",
    skinUndertone: document.getElementById("skinUndertone")?.value || "unknown",
    occasion: document.getElementById("occasion")?.value || "daily",
    coverage: document.getElementById("coverage")?.value || "light",
    style: document.getElementById("makeupStyle")?.value || "natural"
  };

  const productSuggestions = {
    es: {
      skinType: {
        dry: "Prepara la piel con una crema hidratante.",
        oily: "Prueba una base ligera de acabado mate.",
        combination: "Combina hidratación con productos ligeros.",
        normal: "Mantén una preparación equilibrada de la piel."
      },
      skinTone: {
        light: "En pieles claras, prueba los tonos en la mandíbula y comprueba el resultado con luz natural.",
        medium: "En pieles medias, compara varios tonos en la mandíbula antes de elegir la base.",
        tan: "En pieles morenas, busca una base que se funda con el tono del cuello.",
        deep: "En pieles profundas, busca tonos que respeten la profundidad y el matiz natural de tu piel."
      },
      skinUndertone: {
        unknown: "Prueba los tonos con luz natural; no necesitas conocer tu subtono para empezar.",
        warm: "Explora tonos cálidos y dorados, comprobando cómo armonizan con tu piel.",
        cool: "Prueba tonos de matiz frío o rosado y observa cuál se integra mejor.",
        neutral: "Compara tonos neutros y verifica que la base se funda con tu piel."
      },
      occasion: {
        daily: "Para el día a día, prioriza productos fáciles de aplicar.",
        work: "Para estudiar o trabajar, elige un look cómodo y duradero.",
        date: "Para una cita, destaca un rasgo que te encante.",
        party: "Para una fiesta, puedes intensificar los ojos o los labios."
      },
      coverage: {
        light: "Cobertura ligera",
        medium: "Cobertura media",
        full: "Cobertura alta"
      },
      style: {
        natural: "Estilo natural",
        glow: "Acabado luminoso",
        elegant: "Estilo elegante",
        creative: "Estilo creativo"
      }
    },
    en: {
      skinType: {
        dry: "Prepare your skin with a moisturizing cream.",
        oily: "Try a lightweight matte-finish foundation.",
        combination: "Combine hydration with lightweight products.",
        normal: "Keep your skin preparation balanced."
      },
      skinTone: {
        light: "For light skin, test foundation along the jawline and check it in natural light.",
        medium: "For medium skin, compare shades along the jawline before choosing a foundation.",
        tan: "For tan skin, look for a foundation that blends with your neck.",
        deep: "For deep skin, choose shades that respect your skin's natural depth and undertone."
      },
      skinUndertone: {
        unknown: "Test shades in natural light; you do not need to know your undertone to begin.",
        warm: "Explore warm or golden shades and see how they harmonize with your skin.",
        cool: "Try cool or rosy shades and check which blends most naturally.",
        neutral: "Compare neutral shades and check that the foundation blends into your skin."
      },
      occasion: {
        daily: "For everyday wear, choose easy-to-apply products.",
        work: "For university or work, choose a comfortable, long-lasting look.",
        date: "For a date, highlight a feature you love.",
        party: "For a party, you can emphasize your eyes or lips."
      },
      coverage: {
        light: "Light coverage",
        medium: "Medium coverage",
        full: "Full coverage"
      },
      style: {
        natural: "Natural style",
        glow: "Glowy finish",
        elegant: "Elegant style",
        creative: "Creative style"
      }
    }
  };

  const tips = productSuggestions[currentLanguage];
  const translatedLook = currentLanguage === "en"
    ? (look.translations?.en || look)
    : look;

  currentLook = {
    mood: selectedMood,
    title: translatedLook.title,
    text: translatedLook.text,
    palette: aiResult.palette,
    finish: aiResult.finish,
    products: aiResult.products,
    preferences,
    personalizedTips: [
      tips.skinType[preferences.skinType],
      tips.skinTone[preferences.skinTone],
      tips.skinUndertone[preferences.skinUndertone],
      tips.occasion[preferences.occasion],
      tips.coverage[preferences.coverage],
      tips.style[preferences.style]
    ],
    language: currentLanguage,
    date: new Date().toISOString()
  };

  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);

  const palette = currentLook.palette.map(escapeHTML).join(", ");
  const products = currentLook.products
    .map((product) => `<li class="mb-1">${escapeHTML(product)}</li>`)
    .join("");
  const personalizedTips = currentLook.personalizedTips
    .map((tip) => `<li class="mb-2">${escapeHTML(tip)}</li>`)
    .join("");

  recommendation.innerHTML = `
    <p class="text-xs uppercase tracking-widest opacity-60">MOODÉ BEAUTY</p>
    <h3 class="text-2xl font-serif mt-2">${escapeHTML(currentLook.title)}</h3>
    <p class="mt-3">${escapeHTML(currentLook.text)}</p>
    <p class="mt-4"><strong>${t("palette")}:</strong> ${palette}</p>
    <p class="mt-2"><strong>${t("finish")}:</strong> ${escapeHTML(currentLook.finish)}</p>
    <p class="mt-4 font-semibold">${t("products")}:</p>
    <ul class="list-disc pl-5 mt-2">${products}</ul>
    <p class="mt-5 font-semibold">${currentLanguage === "es" ? "Tu recomendación personalizada" : "Your personalized recommendation"}</p>
    <ul class="list-disc pl-5 mt-2">${personalizedTips}</ul>
    <p class="text-xs opacity-60 mt-4">${t("aiNote")}</p>
    <button id="saveCurrentLookButton" type="button" class="moode-gradient mt-5 w-full rounded-full px-5 py-3 font-semibold">${t("saveLook")}</button>
  `;

  recommendation.classList.remove("hidden");
}

async function saveCurrentLook() {
  if (!currentLook) return;

  if (!currentUser) {
    alert(
      currentLanguage === "en"
        ? "Please sign in to save your look."
        : "Inicia sesión para guardar tu look."
    );
    return;
  }

  const button = document.getElementById("saveCurrentLookButton");
  if (button) button.disabled = true;

  try {
    // Guardar el look en Supabase asociado a la cuenta actual.
    const { error: savedError } = await supabase
      .from("saved_looks")
      .insert({
        user_id: currentUser.id,
        mood: currentLook.mood,
        title: currentLook.title,
        description: currentLook.text,
        palette: currentLook.palette,
        finish: currentLook.finish,
        products: currentLook.products
      });

    if (savedError) throw savedError;

    // Registrar la recomendación en el historial.
    const { error: historyError } = await supabase
      .from("look_history")
      .insert({
        user_id: currentUser.id,
        mood: currentLook.mood,
        title: currentLook.title
      });

    if (historyError) {
      console.error("Error guardando el historial:", historyError);
      alert(
        currentLanguage === "en"
          ? "Your look was saved, but the history could not be updated."
          : "Tu look se guardó, pero no se pudo actualizar el historial."
      );
    } else {
      // Mantener una copia local como respaldo.
      const saved = JSON.parse(
        localStorage.getItem("moodeSavedLooks") || "[]"
      );

      saved.unshift(currentLook);
      localStorage.setItem(
        "moodeSavedLooks",
        JSON.stringify(saved.slice(0, 50))
      );

      const history = JSON.parse(
        localStorage.getItem("moodeHistory") || "[]"
      );

      history.unshift({
        mood: currentLook.mood,
        title: currentLook.title,
        date: currentLook.date
      });

      localStorage.setItem(
        "moodeHistory",
        JSON.stringify(history.slice(0, 100))
      );

      if (button) {
        button.textContent = t("savedSuccess");
      }

      await renderSavedLooks();
    }
  } catch (error) {
    console.error("Error guardando el look en Supabase:", error);

    alert(
      currentLanguage === "en"
        ? "We couldn't save your look. Please try again."
        : "No pudimos guardar tu look. Revisa la conexión e inténtalo de nuevo."
    );
  } finally {
    if (button) button.disabled = false;
  }
}

async function renderSavedLooks() {
  const container = document.getElementById("savedLooksContainer");
  const empty = document.getElementById("savedLooksEmpty");

  if (!container || !empty) return;

  let saved = [];

  if (currentUser) {
    const { data, error } = await supabase
      .from("saved_looks")
      .select("id, mood, title, description, palette, finish, products, created_at")
      .eq("user_id", currentUser.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error cargando los looks guardados:", error);
      empty.classList.remove("hidden");

      const emptyText = empty.querySelector("p");
      if (emptyText) {
        emptyText.textContent =
          currentLanguage === "en"
            ? "We couldn't load your saved looks. Please try again."
            : "No pudimos cargar tus looks guardados. Inténtalo de nuevo.";
      }

      return;
    }

    saved = (data || []).map((look) => ({
      ...look,
      text: look.description || "",
      date: look.created_at
    }));
  }

  container.innerHTML = "";

  saved.forEach((look) => {
    const card = document.createElement("article");
    card.className =
      "rounded-2xl border border-pink-200 p-5 shadow-sm";

    const title = document.createElement("h3");
    title.className = "font-serif text-xl";
    title.textContent = look.title || "";

    const mood = document.createElement("p");
    mood.className = "mt-2 text-sm opacity-70";
    mood.textContent =
      `${t("selectedMood")} ${
        moodNames[look.mood]?.[currentLanguage] || look.mood || ""
      }`;

    const description = document.createElement("p");
    description.className = "mt-3 text-sm";
    description.textContent = look.text || "";

    card.append(title, mood, description);
    container.appendChild(card);
  });

  empty.classList.toggle("hidden", saved.length > 0);

  const emptyText = empty.querySelector("p");
  if (emptyText) emptyText.textContent = t("savedEmpty");

  const heading = empty.querySelector("h2");
  if (heading) heading.textContent = t("savedTitle");
}


document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.mood) {
    selectMood(button.dataset.mood);
    return;
  }

  switch (button.id) {
    case "themeToggle":
    case "authThemeToggle": {
      const isDark = !document.documentElement.classList.contains("dark");

      document.documentElement.classList.toggle("dark", isDark);
      localStorage.setItem("moodeTheme", isDark ? "dark" : "light");

      applyAuthLanguage();
      break;
    }

    case "languageToggle":
    case "authLanguageToggle": {
      currentLanguage = currentLanguage === "es" ? "en" : "es";
      localStorage.setItem("moodeLanguage", currentLanguage);

      applyLanguage();
      applyAuthLanguage();
      break;
    }

    case "homeButton":
    case "logoButton":
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

    case "startCameraButton":
      startCamera();
      break;
      case "uploadPhotoButton":
  document.getElementById("photoUpload")?.click();
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


const savedTheme = localStorage.getItem("moodeTheme");
document.documentElement.classList.toggle("dark", savedTheme === "dark");

const themeButton = document.getElementById("themeToggle");
if (themeButton) {
  themeButton.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

const authThemeButton = document.getElementById("authThemeToggle");
if (authThemeButton) {
  authThemeButton.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}


applyLanguage();

let currentUser = null;

function showAuthMessage(message, isError = false) {
  const element = document.getElementById("authMessage");
  if (!element) return;

  element.textContent = message;
  element.classList.toggle("text-red-600", isError);
  element.classList.toggle("text-gray-600", !isError);
}

function showAuthMode(mode) {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const loginButton = document.getElementById("authShowLogin");
  const signupButton = document.getElementById("authShowSignup");

  if (!loginForm || !signupForm) return;

  const isLogin = mode === "login";

  loginForm.classList.toggle("hidden", !isLogin);
  signupForm.classList.toggle("hidden", isLogin);

  loginButton?.classList.toggle("bg-white", isLogin);
  loginButton?.classList.toggle("shadow-sm", isLogin);
  loginButton?.classList.toggle("text-gray-800", isLogin);
  signupButton?.classList.toggle("bg-white", !isLogin);
  signupButton?.classList.toggle("shadow-sm", !isLogin);
  signupButton?.classList.toggle("text-gray-800", !isLogin);

  showAuthMessage("");
}

function showAuthenticatedApp(user) {
  currentUser = user;

  const authPage = document.getElementById("authPage");
  const app = document.getElementById("app");

  authPage?.classList.add("hidden");
  app?.classList.remove("hidden");

  renderSavedLooks();
  applyLanguage();
}

function showLoginScreen() {
  currentUser = null;

  document.getElementById("app")?.classList.add("hidden");
  document.getElementById("authPage")?.classList.remove("hidden");

  showAuthMode("login");
  showAuthMessage(
    currentLanguage === "en"
      ? "Sign in or create your personal account."
      : "Inicia sesión o crea tu cuenta personal."
  );
}

document.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.id === "authShowLogin") {
    showAuthMode("login");
    return;
  }

  if (button.id === "authShowSignup") {
    showAuthMode("signup");
    return;
  }

  if (button.id === "logoutButton") {
    button.disabled = true;

    const { error } = await supabase.auth.signOut();

    button.disabled = false;

    if (error) {
      showAuthMessage(error.message, true);
      return;
    }

    showLoginScreen();
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id !== "photoUpload") return;

  const file = event.target.files?.[0];

  if (file) {
    loadUploadedPhoto(file);
  }

  event.target.value = "";
});


document.addEventListener("submit", async (event) => {
  if (event.target.id !== "loginForm" && event.target.id !== "signupForm") {
    return;
  }

  event.preventDefault();

  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');

  if (submitButton) submitButton.disabled = true;

  showAuthMessage(
    currentLanguage === "en"
      ? "Please wait..."
      : "Un momento, estamos procesando tu solicitud..."
  );

  try {
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (form.id === "signupForm") {
      const name = String(formData.get("name") || "").trim();

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name
          }
        }
      });

      if (error) throw error;

      if (data.session && data.user) {
        showAuthenticatedApp(data.user);
        showAuthMessage(
          currentLanguage === "en"
            ? "Your account was created successfully."
            : "¡Tu cuenta se creó correctamente!"
        );
      } else {
        showAuthMode("login");
        showAuthMessage(
          currentLanguage === "en"
            ? "Account created. Check your email to confirm your account, then sign in."
            : "Cuenta creada. Revisa tu correo para confirmar la cuenta y después inicia sesión."
        );
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        showAuthenticatedApp(data.user);
      }
    }
  } catch (error) {
    console.error("Error de autenticación MOODÉ:", error);

    showAuthMessage(
      error.message ||
        (currentLanguage === "en"
          ? "We couldn't complete the request. Please try again."
          : "No pudimos completar la solicitud. Inténtalo de nuevo."),
      true
    );
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
});

async function initializeAuthentication() {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    if (data.session?.user) {
      showAuthenticatedApp(data.session.user);
    } else {
      showLoginScreen();
    }
  } catch (error) {
    console.error("Error al recuperar la sesión:", error);
    showLoginScreen();
    showAuthMessage(
      currentLanguage === "en"
        ? "Unable to verify your session. Check your Supabase configuration and connection."
        : "No pudimos verificar tu sesión. Revisa la configuración de Supabase y tu conexión.",
      true
    );
  }
}
applyAuthLanguage();
initializeAuthentication();
