export function ScannerComponent() {
  return `
    <section id="scanner" class="px-6 py-12">
      <div class="max-w-2xl mx-auto rounded-3xl p-6 shadow-xl">
        <div class="text-center mb-6">
          <span class="text-xs tracking-[0.25em] uppercase opacity-60">MOODÉ AI SCANNER</span>
          <h2 class="text-3xl font-serif mt-3" data-i18n="scannerTitle">Analiza tu look</h2>
          <p class="mt-3 opacity-70" data-i18n="scannerDescription">
            Elige tu mood, captura una foto y descubre una recomendación de maquillaje.
          </p>
        </div>

        <h3 class="font-semibold mb-3" data-i18n="moodTitle">¿Cómo quieres sentirte hoy?</h3>
        <div class="grid grid-cols-2 gap-3 mb-6">
          <button type="button" data-mood="Radiante" class="moodChoice rounded-2xl p-4 border border-pink-200 hover:bg-pink-100">✨ <span data-i18n="moodRadiant">Radiante</span></button>
          <button type="button" data-mood="Elegante" class="moodChoice rounded-2xl p-4 border border-pink-200 hover:bg-pink-100">🖤 <span data-i18n="moodElegant">Elegante</span></button>
          <button type="button" data-mood="Romántica" class="moodChoice rounded-2xl p-4 border border-pink-200 hover:bg-pink-100">🌸 <span data-i18n="moodRomantic">Romántica</span></button>
          <button type="button" data-mood="Tranquila" class="moodChoice rounded-2xl p-4 border border-pink-200 hover:bg-pink-100">🌙 <span data-i18n="moodCalm">Tranquila</span></button>
        </div>

        <p id="selectedMood" class="text-sm mb-4 opacity-70" data-i18n="noMood">Aún no has seleccionado un mood.</p>

        <div class="rounded-3xl overflow-hidden bg-black aspect-[3/4] relative">
          <video id="camera" autoplay playsinline class="w-full h-full object-cover"></video>
          <canvas id="photoCanvas" class="hidden w-full h-full object-cover"></canvas>
        </div>

        <p id="cameraMessage" class="text-center mt-4 text-sm opacity-70" data-i18n="cameraInactive">Activa la cámara para comenzar.</p>

        <button id="startCameraButton" type="button" class="moode-gradient w-full mt-4 py-3 rounded-full font-semibold" data-i18n="startCamera">Activar cámara</button>
        <button id="captureButton" type="button" class="w-full mt-3 py-3 rounded-full font-semibold shadow-md border border-pink-200" data-i18n="capturePhoto">Capturar rostro ✦</button>
        <p id="photoStatus" class="text-center mt-3 text-sm opacity-60" data-i18n="photoRequired">Primero activa la cámara.</p>

        <button id="generateLookButton" type="button" class="moode-gradient w-full mt-5 py-4 rounded-full font-semibold" data-i18n="generateLook">Generar mi recomendación ✦</button>

        <div id="recommendation" class="mt-6 rounded-2xl p-5 border border-pink-200 hidden"></div>
      </div>
    </section>
  `;
}
