export function SavedComponent() {
  return `
    <section class="mx-auto w-full max-w-5xl px-5 py-10">
      <div class="mb-8">
        <p data-i18n="savedCollection" class="text-sm font-semibold uppercase tracking-[0.2em] text-pink-500">
          Tu colección personal
        </p>
        <h1 data-i18n="savedHeading" class="mt-2 font-display text-4xl font-semibold">Looks guardados</h1>
        <p data-i18n="savedDescription" class="mt-3 text-base opacity-75">
          Tus ideas favoritas de maquillaje, reunidas en un solo lugar.
        </p>
      </div>

      <div id="savedLooksContainer" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"></div>

      <div id="savedLooksEmpty" class="rounded-3xl border border-pink-100 bg-white/70 p-8 text-center shadow-sm">
        <div class="mb-4 text-4xl">💗</div>
        <h2 data-i18n="savedEmptyHeading" class="text-xl font-semibold">Tu colección empieza aquí</h2>
        <p data-i18n="savedEmptyDescription" class="mt-2 text-sm opacity-70">
          Cuando guardes tus looks favoritos, aparecerán en esta sección.
        </p>
        <button id="savedGoScanner" type="button" data-i18n="savedCreate" class="moode-gradient mt-6 rounded-full px-6 py-3 font-semibold">
          Crear un look
        </button>
      </div>
    </section>
  `;
}
