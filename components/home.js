export function HomeComponent() {
  return `
    <section class="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
      <span class="text-sm tracking-[0.3em] uppercase opacity-60">MOODÉ AI BEAUTY</span>

      <h1 class="text-5xl md:text-7xl font-serif mt-5">
        <span data-i18n="homeTitle">Tu mood. Tu estilo.</span>
      </h1>

      <p data-i18n="homeDescription" class="max-w-md mt-6 text-base opacity-70">
        Descubre el maquillaje que mejor representa cómo quieres sentirte hoy.
      </p>

      <button id="startExperienceButton"
        data-i18n="homeStart"
        class="moode-gradient mt-8 px-8 py-4 rounded-full font-semibold shadow-lg transition hover:scale-105">
        Descubrir mi look ✦
      </button>
    </section>
  `;
}
