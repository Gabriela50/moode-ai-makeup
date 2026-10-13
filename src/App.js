import { HomeComponent } from "../components/home.js";
import { ProfileComponent } from "../components/profile.js";
import { ScannerComponent } from "../components/scanner.js";
import { SavedComponent } from "../components/saved.js";

export function App() {
  return `
    <div id="app">
      <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
        <nav class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-2">
          <button id="logoButton" class="font-serif text-2xl font-semibold">MOODÉ</button>

          <div class="flex items-center gap-1 flex-wrap justify-end">
            <button id="homeButton" data-i18n="navHome" class="px-2 py-2 rounded-full text-sm">Inicio</button>
            <button id="scannerNavButton" data-i18n="navScanner" class="px-2 py-2 rounded-full text-sm">Scanner</button>
            <button id="savedButton" data-i18n="navLooks" class="px-2 py-2 rounded-full text-sm">Looks</button>
            <button id="profileButton" data-i18n="navProfile" class="px-2 py-2 rounded-full text-sm">Perfil</button>
            <button id="languageToggle" class="min-w-[48px] shrink-0 px-3 py-2 rounded-full text-sm font-semibold border border-pink-200" aria-label="Change language">EN</button>
            <button id="themeToggle" class="w-10 h-10 rounded-full" aria-label="Cambiar tema">🌙</button>
          </div>
        </nav>
      </header>

      <main class="pt-20">
        <div id="homePage">${HomeComponent()}</div>
        <div id="scannerPage" class="hidden">${ScannerComponent()}</div>
        <div id="savedPage" class="hidden">${SavedComponent()}</div>
        <div id="profilePage" class="hidden">${ProfileComponent()}</div>
      </main>
    </div>
  `;
}
