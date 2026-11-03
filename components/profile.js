export function ProfileComponent() {
  return `
    <section class="px-4 py-8 sm:px-8 sm:py-12">
      <div class="mx-auto max-w-6xl space-y-6">

        <!-- Encabezado de belleza -->
        <div class="relative overflow-hidden rounded-[2rem] border border-rose-200/70
                    bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100
                    p-6 shadow-sm sm:p-10 dark:from-rose-950 dark:via-slate-900
                    dark:to-purple-950 dark:border-rose-900">
          <div class="absolute -right-10 -top-16 h-48 w-48 rounded-full
                      bg-white/40 blur-3xl"></div>

          <div class="relative flex flex-col items-center gap-6 sm:flex-row">
            <div class="relative shrink-0">
              <div class="rounded-full bg-white p-1.5 shadow-xl ring-1 ring-rose-200">
                <img
                  src="/assets/avatar-gabriela.png"
                  alt="Avatar personal de Gabriela"
                  class="h-32 w-32 rounded-full object-cover object-center sm:h-40 sm:w-40"
                  onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
                />
                <div class="hidden h-32 w-32 items-center justify-center rounded-full
                            bg-rose-200 text-4xl font-serif text-rose-800 sm:h-40 sm:w-40">
                  G
                </div>
              </div>
              <span class="absolute bottom-2 right-1 rounded-full border-4
                           border-pink-50 bg-emerald-400 p-2 dark:border-slate-900"></span>
            </div>

            <div class="min-w-0 flex-1 text-center sm:text-left">
              <p class="text-xs font-semibold uppercase tracking-[0.3em]
                        text-rose-700 dark:text-rose-300">MOODÉ · BEAUTY SPACE</p>
              <h2 class="mt-3 font-serif text-3xl font-medium text-rose-950
                         sm:text-5xl dark:text-white">
                Hola, Gabriela <span class="text-rose-500">♡</span>
              </h2>
              <p data-i18n="profileLabel"
                 class="mt-3 text-xs font-semibold uppercase tracking-[0.25em]
                        text-rose-700 dark:text-rose-300">MI PERFIL</p>
              <p data-i18n="profileDescription"
                 class="mt-3 max-w-xl text-sm leading-7 text-rose-950/75
                        sm:text-base dark:text-rose-100/80">
                Tu espacio para descubrir tu belleza, guardar tus looks
                favoritos y elegir cómo quieres sentirte cada día.
              </p>
            </div>

            <div class="hidden font-serif text-6xl text-rose-400/70 sm:block">✧</div>
          </div>
        </div>

        <!-- Resumen -->
        <div class="grid gap-4 sm:grid-cols-3">
          <article class="rounded-2xl border border-rose-200 bg-white/80 p-5
                          dark:border-rose-900 dark:bg-slate-900/80">
            <span class="text-2xl text-rose-500">✧</span>
            <p class="mt-3 text-xs uppercase tracking-widest text-gray-500
                      dark:text-gray-400">MI ESTILO</p>
            <p class="mt-1 font-serif text-xl text-rose-900 dark:text-rose-200">
              Natural & Glow
            </p>
          </article>

          <article class="rounded-2xl border border-purple-200 bg-white/80 p-5
                          dark:border-purple-900 dark:bg-slate-900/80">
            <span class="text-2xl text-purple-500">♡</span>
            <p class="mt-3 text-xs uppercase tracking-widest text-gray-500
                      dark:text-gray-400">MI ENERGÍA</p>
            <p class="mt-1 font-serif text-xl text-purple-900 dark:text-purple-200">
              A mi manera
            </p>
          </article>

          <article class="rounded-2xl border border-pink-200 bg-white/80 p-5
                          dark:border-pink-900 dark:bg-slate-900/80">
            <span class="text-2xl text-pink-500">❀</span>
            <p class="mt-3 text-xs uppercase tracking-widest text-gray-500
                      dark:text-gray-400">MI MOMENTO</p>
            <p class="mt-1 font-serif text-xl text-pink-900 dark:text-pink-200">
              Brilla siendo tú
            </p>
          </article>
        </div>

        <!-- Contenido principal -->
        <div class="grid gap-5 md:grid-cols-2">
          <article class="rounded-3xl border border-rose-200/80 bg-white p-6
                          shadow-sm dark:border-rose-900 dark:bg-slate-900">
            <div class="flex items-center gap-3">
              <span class="flex h-11 w-11 items-center justify-center rounded-2xl
                           bg-rose-100 text-2xl text-rose-700 dark:bg-rose-950
                           dark:text-rose-300">♡</span>
              <div>
                <h3 class="font-serif text-2xl text-rose-950 dark:text-rose-100">
                  Mis moods favoritos
                </h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Elige el mood que va contigo.
                </p>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-3">
              <div class="rounded-2xl bg-gradient-to-br from-orange-100 to-rose-100
                          p-4 text-center dark:from-orange-950 dark:to-rose-950">
                <span class="text-2xl">☀</span>
                <p class="mt-2 font-medium text-rose-900 dark:text-rose-200">Radiante</p>
              </div>
              <div class="rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100
                          p-4 text-center dark:from-purple-950 dark:to-pink-950">
                <span class="text-2xl">✧</span>
                <p class="mt-2 font-medium text-purple-900 dark:text-purple-200">Elegante</p>
              </div>
              <div class="rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100
                          p-4 text-center dark:from-pink-950 dark:to-rose-950">
                <span class="text-2xl">♡</span>
                <p class="mt-2 font-medium text-pink-900 dark:text-pink-200">Romántica</p>
              </div>
              <div class="rounded-2xl bg-gradient-to-br from-violet-100 to-slate-100
                          p-4 text-center dark:from-violet-950 dark:to-slate-950">
                <span class="text-2xl">❀</span>
                <p class="mt-2 font-medium text-violet-900 dark:text-violet-200">Tranquila</p>
              </div>
            </div>
          </article>

          <article class="rounded-3xl border border-purple-200/80 bg-white p-6
                          shadow-sm dark:border-purple-900 dark:bg-slate-900">
            <div class="flex items-center gap-3">
              <span class="flex h-11 w-11 items-center justify-center rounded-2xl
                           bg-purple-100 text-2xl text-purple-700 dark:bg-purple-950
                           dark:text-purple-300">✿</span>
              <div>
                <h3 class="font-serif text-2xl text-purple-950 dark:text-purple-100">
                  Mi universo beauty
                </h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Tu belleza, tus decisiones.
                </p>
              </div>
            </div>

            <div class="mt-6 space-y-3">
              <div class="flex items-center gap-4 rounded-2xl bg-rose-50 p-4
                          dark:bg-rose-950/50">
                <span class="text-2xl">💄</span>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Looks guardados</p>
                  <p data-i18n="profileLooks" class="text-sm text-gray-500 dark:text-gray-400">
                    Tus combinaciones favoritas
                  </p>
                </div>
                <span class="ml-auto text-rose-500">♡</span>
              </div>

              <div class="flex items-center gap-4 rounded-2xl bg-purple-50 p-4
                          dark:bg-purple-950/50">
                <span class="text-2xl">🎨</span>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">Mis preferencias</p>
                  <p data-i18n="profilePreferences"
                     class="text-sm text-gray-500 dark:text-gray-400">
                    Tonos y estilos favoritos
                  </p>
                </div>
                <span class="ml-auto text-purple-500">✧</span>
              </div>

              <div class="rounded-2xl border border-dashed border-rose-300 p-4
                          text-center dark:border-rose-800">
                <p class="font-serif text-xl italic text-rose-800 dark:text-rose-200">
                  “El mejor look es el que te hace sentir tú.”
                </p>
                <p class="mt-2 text-xs tracking-[0.2em] text-rose-500">
                  MOODÉ · BEAUTY YOUR WAY
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  `;
}
