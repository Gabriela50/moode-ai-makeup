export function HomeComponent() {
  return `
    <section class="moode-welcome relative mx-auto flex min-h-[calc(100vh-110px)] w-full max-w-5xl flex-col items-center justify-center overflow-hidden px-5 py-8 text-center">

      <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div class="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-300/20 blur-3xl"></div>
        <div class="absolute left-1/4 top-1/4 h-40 w-40 rounded-full bg-purple-300/20 blur-3xl"></div>
      </div>

      <div class="moode-avatar-frame relative mb-8 w-full max-w-[440px]">
        <div class="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-br from-pink-200 via-rose-300 to-purple-200 opacity-70 blur-md"></div>

        <div class="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 p-2 shadow-2xl shadow-pink-300/30">
          <img
            src="/assets/avatar-gabriela.png"
            alt="Avatar de MOODÉ"
            class="moode-avatar-image block aspect-[3/4] w-full rounded-[1.6rem] object-cover object-center"
            fetchpriority="high"
          />
        </div>
        <span class="pointer-events-none absolute -right-2 top-8 text-3xl" aria-hidden="true">✦</span>
        <span class="pointer-events-none absolute -left-2 bottom-12 text-2xl" aria-hidden="true">✧</span>
      </div>

      <h1 class="mb-8 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        MOODÉ
      </h1>

      <button
        id="homeStartButton"
        type="button"
        data-page="scanner"
        class="moode-discover-button inline-flex min-h-14 min-w-[220px] items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-400 px-10 py-4 text-base font-bold tracking-[0.18em] text-white shadow-xl shadow-pink-500/25 transition duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95"
      >DESCUBRIR</button>
    </section>

    <style>
      .moode-avatar-frame {
        animation: moodeAvatarFloat 5s ease-in-out infinite;
      }
      .moode-avatar-image {
        filter: saturate(1.04) contrast(1.02);
      }
      .moode-discover-button {
        letter-spacing: .18em;
      }
      @keyframes moodeAvatarFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-7px); }
      }
      @media (prefers-reduced-motion: reduce) {
        .moode-avatar-frame { animation: none; }
      }
    </style>
  `;
}
