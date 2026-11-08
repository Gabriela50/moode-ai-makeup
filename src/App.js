import { HomeComponent } from "../components/home.js";
import { ProfileComponent } from "../components/profile.js";
import { SavedComponent } from "../components/saved.js";
import { ScannerComponent } from "../components/scanner.js";

export function App() {
  return `
    <div id="authPage" class="min-h-screen bg-[#fff8fc] px-4 py-5 text-[#352738] sm:px-8 sm:py-8">
      <div class="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#" class="font-display text-2xl font-semibold tracking-tight text-[#6e496b]">
          MOODÉ<span class="text-[#d68bb7]">.</span>
        </a>

        <div class="flex items-center gap-2">
          <button id="authLanguageToggle" type="button" class="rounded-full border border-[#ead9e8] bg-white px-4 py-2 text-xs font-semibold shadow-sm">
            EN
          </button>
          <button id="authThemeToggle" type="button" aria-label="Cambiar tema" class="flex h-10 w-10 items-center justify-center rounded-full border border-[#ead9e8] bg-white text-lg shadow-sm">
            🌙
          </button>
        </div>
      </div>

      <div class="mx-auto grid min-h-[82vh] max-w-7xl items-center gap-8 py-8 lg:grid-cols-2 lg:gap-16">
        <section class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f7dce9] via-[#eee3fa] to-[#dceafa] px-7 py-10 sm:px-12 sm:py-14 lg:min-h-[570px] lg:content-center">
          <div class="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full border-[28px] border-white/30"></div>
          <div class="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-white/25 blur-sm"></div>

          <div class="relative z-10 max-w-lg">
            <p id="authEyebrow" class="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#8b587e]">
              BEAUTY, YOUR WAY
            </p>

            <h1 class="font-display text-5xl leading-[1.08] tracking-tight text-[#493448] sm:text-6xl">
              Your mood.<br />
              <span class="italic text-[#a56d9a]">Your beauty.</span>
            </h1>

            <p id="authDescription" class="mt-6 max-w-md text-base leading-7 text-[#68556a]">
              Descubre nuevas formas de expresarte con recomendaciones de maquillaje inspiradas en tu estilo y tu estado de ánimo.
            </p>

            <div class="mt-9 grid grid-cols-3 gap-3">
              <div class="rounded-2xl border border-white/60 bg-white/55 p-3 text-center backdrop-blur-sm">
                <span class="text-2xl">✧</span>
                <p id="authFeatureOne" class="mt-2 text-xs font-medium">Tu estilo</p>
              </div>
              <div class="rounded-2xl border border-white/60 bg-white/55 p-3 text-center backdrop-blur-sm">
                <span class="text-2xl">♡</span>
                <p id="authFeatureTwo" class="mt-2 text-xs font-medium">Tus looks</p>
              </div>
              <div class="rounded-2xl border border-white/60 bg-white/55 p-3 text-center backdrop-blur-sm">
                <span class="text-2xl">✦</span>
                <p id="authFeatureThree" class="mt-2 text-xs font-medium">Tu mood</p>
              </div>
            </div>

            <p id="authFooter" class="mt-10 text-xs tracking-wide text-[#7d637d]">
              YOUR BEAUTY, YOUR RULES.
            </p>
          </div>
        </section>

        <section class="mx-auto w-full max-w-md py-4 lg:px-4">
          <div class="mb-8">
            <p id="authWelcome" class="text-sm font-medium text-[#b17ba7]">Bienvenida a tu espacio</p>
            <h2 id="authHeading" class="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Tu próximo look empieza aquí.
            </h2>
            <p id="authSubheading" class="mt-3 text-sm leading-6 text-gray-500">
              Accede a tu colección personal de belleza.
            </p>
          </div>

          <div class="rounded-3xl border border-[#f0e4ee] bg-white p-5 shadow-[0_20px_60px_rgba(119,77,111,0.09)] sm:p-8">
            <div class="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-[#fbf4fa] p-1.5">
              <button id="authShowLogin" type="button" class="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-[#704e6c] shadow-sm">
                Iniciar sesión
              </button>
              <button id="authShowSignup" type="button" class="rounded-xl px-3 py-3 text-sm font-semibold text-gray-500">
                Crear cuenta
              </button>
            </div>

            <form id="loginForm" class="space-y-5">
              <div>
                <label id="loginEmailLabel" for="loginEmail" class="mb-2 block text-sm font-medium text-gray-700">Correo electrónico</label>
                <input id="loginEmail" name="email" type="email" autocomplete="email" required placeholder="tu@correo.com"
                  class="w-full rounded-xl border border-[#eadfea] bg-[#fffdfd] px-4 py-3.5 text-sm outline-none transition focus:border-[#c18ab6] focus:ring-4 focus:ring-[#f7eaf4]">
              </div>

              <div>
                <label id="loginPasswordLabel" for="loginPassword" class="mb-2 block text-sm font-medium text-gray-700">Contraseña</label>
                <input id="loginPassword" name="password" type="password" autocomplete="current-password" required placeholder="Tu contraseña"
                  class="w-full rounded-xl border border-[#eadfea] bg-[#fffdfd] px-4 py-3.5 text-sm outline-none transition focus:border-[#c18ab6] focus:ring-4 focus:ring-[#f7eaf4]">
              </div>

              <button id="loginSubmit" type="submit" class="w-full rounded-xl bg-gradient-to-r from-[#c98db7] via-[#b99bd6] to-[#91b5dc] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-[#c9a6cc]/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60">
                Entrar a MOODÉ <span aria-hidden="true">↗</span>
              </button>
            </form>

            <form id="signupForm" class="hidden space-y-5">
              <div>
                <label id="signupNameLabel" for="signupName" class="mb-2 block text-sm font-medium text-gray-700">Tu nombre</label>
                <input id="signupName" name="name" type="text" autocomplete="name" required maxlength="80" placeholder="¿Cómo te llamas?"
                  class="w-full rounded-xl border border-[#eadfea] bg-[#fffdfd] px-4 py-3.5 text-sm outline-none transition focus:border-[#c18ab6] focus:ring-4 focus:ring-[#f7eaf4]">
              </div>

              <div>
                <label id="signupEmailLabel" for="signupEmail" class="mb-2 block text-sm font-medium text-gray-700">Correo electrónico</label>
                <input id="signupEmail" name="email" type="email" autocomplete="email" required placeholder="tu@correo.com"
                  class="w-full rounded-xl border border-[#eadfea] bg-[#fffdfd] px-4 py-3.5 text-sm outline-none transition focus:border-[#c18ab6] focus:ring-4 focus:ring-[#f7eaf4]">
              </div>

              <div>
                <label id="signupPasswordLabel" for="signupPassword" class="mb-2 block text-sm font-medium text-gray-700">Crea una contraseña</label>
                <input id="signupPassword" name="password" type="password" autocomplete="new-password" required minlength="6" placeholder="Mínimo 6 caracteres"
                  class="w-full rounded-xl border border-[#eadfea] bg-[#fffdfd] px-4 py-3.5 text-sm outline-none transition focus:border-[#c18ab6] focus:ring-4 focus:ring-[#f7eaf4]">
              </div>

              <button id="signupSubmit" type="submit" class="w-full rounded-xl bg-gradient-to-r from-[#c98db7] via-[#b99bd6] to-[#91b5dc] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-[#c9a6cc]/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60">
                Crear mi cuenta ♡
              </button>
            </form>

            <p id="authMessage" role="status" aria-live="polite" class="mt-5 text-center text-sm text-gray-600"></p>
          </div>

          <p id="authPrivacy" class="mt-5 text-center text-xs leading-5 text-gray-400">
            Tu espacio personal. Tus preferencias. Tu estilo.
          </p>
        </section>
      </div>
    </div>

    <div id="app" class="hidden">
      <header class="fixed left-0 right-0 top-0 z-50 border-b border-pink-100/60 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/80">
        <nav class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <button id="logoButton" type="button" class="font-display text-2xl font-semibold">MOODÉ</button>

          <div class="flex flex-wrap items-center justify-end gap-1">
            <button id="homeButton" type="button" data-i18n="navHome" class="rounded-full px-3 py-2 text-sm">Inicio</button>
            <button id="scannerNavButton" type="button" data-i18n="navScanner" class="rounded-full px-3 py-2 text-sm">Scanner</button>
            <button id="savedButton" type="button" data-i18n="navLooks" class="rounded-full px-3 py-2 text-sm">Looks</button>
            <button id="profileButton" type="button" data-i18n="navProfile" class="rounded-full px-3 py-2 text-sm">Perfil</button>
            <button id="languageToggle" type="button" class="min-w-[48px] rounded-full border border-pink-200 px-3 py-2 text-sm font-semibold" aria-label="Change language">EN</button>
            <button id="themeToggle" type="button" class="h-10 w-10 rounded-full" aria-label="Cambiar tema">🌙</button>
            <button id="logoutButton" type="button" class="rounded-full border border-pink-200 px-3 py-2 text-sm">Salir</button>
          </div>
        </nav>
      </header>

      <main class="px-4 pb-10 pt-24">
        <div id="homePage" class="mx-auto max-w-6xl">${HomeComponent()}</div>
        <div id="scannerPage" class="mx-auto hidden max-w-6xl">${ScannerComponent()}</div>
        <div id="savedPage" class="mx-auto hidden max-w-6xl">${SavedComponent()}</div>
        <div id="profilePage" class="mx-auto hidden max-w-6xl">${ProfileComponent()}</div>
      </main>
    </div>
  `;
}