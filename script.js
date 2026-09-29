let selectedMood = "";
let cameraStream = null;
let photoCaptured = false;


/* RECOMENDACIONES */

const recommendations = {

    "Radiante": {
        title: "Glow Radiante ✨",
        text: "Te recomendamos una piel luminosa, blush rosado, iluminador suave y labios glossy para resaltar tu energía."
    },

    "Elegante": {
        title: "Elegancia Clásica 🖤",
        text: "Un look sofisticado con piel uniforme, sombras neutras, delineado definido y labios nude o rojo elegante."
    },

    "Romántica": {
        title: "Soft Romantic 🌸",
        text: "Tonos rosados, blush suave, sombras delicadas e iluminador ligero para conseguir un estilo romántico y femenino."
    },

    "Tranquila": {
        title: "Natural Calm 🌙",
        text: "Un maquillaje natural con tonos tierra, piel fresca, cejas suaves y labios nude para un resultado relajado."
    }

};


/* IR A LA EXPERIENCIA */

function startExperience() {

    document.getElementById("scanner").scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {
        startCamera();
    }, 700);
}


/* SELECCIONAR MOOD */

function selectMood(mood) {

    selectedMood = mood;

    const message = document.getElementById("selectedMood");

    message.textContent = `Tu mood seleccionado: ${mood} ✦`;

    const cards = document.querySelectorAll(".mood-card");

    cards.forEach(card => {

        card.classList.remove("active");

        if (card.innerText.includes(mood)) {
            card.classList.add("active");
        }

    });

}


/* ACTIVAR CÁMARA */

async function startCamera() {

    const video = document.getElementById("camera");
    const message = document.getElementById("cameraMessage");

    try {

        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user"
            },
            audio: false
        });

        video.srcObject = cameraStream;

        message.textContent = "✦ Rostro detectado · Mira al centro";

    } catch (error) {

        console.error(error);

        message.textContent =
            "No pudimos acceder a la cámara. Revisa los permisos del navegador.";

    }

}


/* CAPTURAR FOTO */

function capturePhoto() {

    const video = document.getElementById("camera");
    const canvas = document.getElementById("photoCanvas");
    const status = document.getElementById("photoStatus");
    const message = document.getElementById("cameraMessage");

    if (!cameraStream) {

        status.textContent =
            "Primero debes activar la cámara.";

        return;
    }


    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;


    const context = canvas.getContext("2d");

    context.translate(canvas.width, 0);
    context.scale(-1, 1);

    context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );


    canvas.style.display = "block";

    photoCaptured = true;

    status.textContent =
        "✓ Rostro capturado correctamente. MOODÉ está listo para analizarlo.";

    message.textContent =
        "✓ Escaneo completado";

}


/* GENERAR LOOK */

function generateLook() {

    const recommendation =
        document.getElementById("recommendation");


    if (!selectedMood) {

        recommendation.innerHTML = `

            <div class="ai-icon">!</div>

            <p>MOODÉ AI</p>

            <h3>Primero selecciona tu mood</h3>

            <span>
                Elige cómo quieres sentirte para que podamos
                personalizar tu maquillaje.
            </span>

        `;

        return;
    }


    if (!photoCaptured) {

        recommendation.innerHTML = `

            <div class="ai-icon">📷</div>

            <p>MOODÉ AI</p>

            <h3>Necesitamos una foto</h3>

            <span>
                Activa la cámara y captura tu rostro antes
                de generar tu recomendación.
            </span>

        `;

        return;
    }


    const look = recommendations[selectedMood];


    recommendation.innerHTML = `

        <div class="ai-icon">✦</div>

        <p>AI BEAUTY ANALYSIS</p>

        <h3>${look.title}</h3>

        <span>
            ${look.text}
        </span>

        <strong>
            Mood analizado: ${selectedMood}
        </strong>

        <br><br>

        <span>
            ✓ Rostro capturado<br>
            ✓ Mood identificado<br>
            ✓ Look personalizado generado
        </span>

        <br>

        <button onclick="resetExperience()">
            Probar otro look ✦
        </button>

    `;

}


/* REINICIAR */

function resetExperience() {

    selectedMood = "";
    photoCaptured = false;

    document.getElementById("selectedMood").textContent =
        "Aún no has seleccionado un mood.";

    document.getElementById("photoStatus").textContent =
        "Primero activa la cámara.";

    document.getElementById("recommendation").innerHTML = `

        <div class="ai-icon">
            ✦
        </div>

        <p>MOODÉ AI</p>

        <h3>
            Tu look está esperando...
        </h3>

        <span>
            Selecciona un mood y captura tu rostro para generar
            una recomendación personalizada.
        </span>

        <button onclick="generateLook()">
            Generar mi look ✦
        </button>

    `;

}