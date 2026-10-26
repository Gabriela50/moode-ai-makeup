import {
  FaceLandmarker,
  FilesetResolver
} from "@mediapipe/tasks-vision";

let landmarkerPromise = null;

async function getFaceLandmarker() {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "/mediapipe/wasm"
      );

      return FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/models/face_landmarker.task",
          delegate: "CPU"
        },
        runningMode: "IMAGE",
        numFaces: 1
      });
    })().catch((error) => {
      landmarkerPromise = null;
      throw error;
    });
  }

  return landmarkerPromise;
}

export async function detectFace(canvas) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new TypeError("Se necesita un canvas válido para analizar la imagen.");
  }

  if (!canvas.width || !canvas.height) {
    throw new Error("La imagen no contiene dimensiones válidas.");
  }

  const landmarker = await getFaceLandmarker();
  const result = landmarker.detect(canvas);
  const landmarks = result.faceLandmarks?.[0];

  if (!landmarks?.length) {
    return {
      detected: false,
      landmarks: []
    };
  }

  return {
    detected: true,
    landmarks
  };
}
