import {
  FaceLandmarker,
  FilesetResolver
} from "@mediapipe/tasks-vision";

let landmarkerPromise = null;
let videoLandmarkerPromise = null;

async function getFaceLandmarker() {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      const vision = await FilesetResolver.forVisionTasks(
        `${import.meta.env.BASE_URL}mediapipe/wasm`
      );

      return FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `${import.meta.env.BASE_URL}models/face_landmarker.task`,
          delegate: "CPU"
        },
        runningMode: "IMAGE",
        numFaces: 1,
        minFaceDetectionConfidence: 0.65,
        minFacePresenceConfidence: 0.65,
        minTrackingConfidence: 0.65
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


async function getVideoFaceLandmarker() {
  if (!videoLandmarkerPromise) {
    videoLandmarkerPromise = (async () => {
      const vision = await FilesetResolver.forVisionTasks(
        `${import.meta.env.BASE_URL}mediapipe/wasm`
      );

      return FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `${import.meta.env.BASE_URL}models/face_landmarker.task`,
          delegate: "CPU"
        },
        runningMode: "VIDEO",
        numFaces: 1,
        minFaceDetectionConfidence: 0.65,
        minFacePresenceConfidence: 0.65,
        minTrackingConfidence: 0.65
      });
    })().catch((error) => {
      videoLandmarkerPromise = null;
      throw error;
    });
  }

  return videoLandmarkerPromise;
}

export async function detectFaceInVideo(video, timestamp) {
  if (!(video instanceof HTMLVideoElement)) {
    throw new TypeError("Se necesita un elemento de video válido.");
  }

  if (
    video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA ||
    !video.videoWidth ||
    !video.videoHeight
  ) {
    return { detected: false, landmarks: [] };
  }

  const landmarker = await getVideoFaceLandmarker();
  const result = landmarker.detectForVideo(video, timestamp);
  const landmarks = result.faceLandmarks?.[0];

  if (!landmarks?.length) {
    return { detected: false, landmarks: [] };
  }

  return { detected: true, landmarks };
}
