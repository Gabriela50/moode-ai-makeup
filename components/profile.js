export function ProfileComponent() {
  return `
    <section class="px-6 py-12">
      <div class="max-w-md mx-auto rounded-3xl p-6 shadow-lg">
        <span data-i18n="profileLabel" class="text-xs tracking-[0.25em] uppercase opacity-60">MI PERFIL</span>

        <h2 data-i18n="profileTitle" class="text-3xl font-serif mt-3">Mi estilo MOODÉ</h2>

        <p data-i18n="profileDescription" class="mt-3 opacity-70">
          Guarda tus preferencias de belleza y descubre recomendaciones personalizadas.
        </p>

        <div class="mt-6 space-y-3">
          <div data-i18n="profileMoods" class="rounded-2xl p-4">✦ Mis moods favoritos</div>
          <div data-i18n="profileLooks" class="rounded-2xl p-4">♡ Mis looks guardados</div>
          <div data-i18n="profilePreferences" class="rounded-2xl p-4">✨ Mis preferencias</div>
        </div>
      </div>
    </section>
  `;
}
