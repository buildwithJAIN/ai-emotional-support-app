// services/ttsService.js

import { Audio } from "expo-av";
import { ELEVEN_API_KEY } from "../config/env";

// Convert ArrayBuffer → Base64 safely for Expo Go
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);

  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  if (!globalThis.btoa) {
    globalThis.btoa = (str) =>
      Buffer.from(str, "binary").toString("base64");
  }

  return globalThis.btoa(binary);
}

// ⭐ languageCode will be "en" | "ml" | "hi" | "ar" | etc.
export async function playTTS(text, languageCode = "en") {
  try {
    const res = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM", // Rachel
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": ELEVEN_API_KEY,
        },
        body: JSON.stringify({
          text,
          language: languageCode,              // ⭐ multilingual support
          output_format: "mp3_44100_128",      // ⭐ safe for Expo playback
          voice_settings: {
            stability: 0.45,
            similarity_boost: 0.8,
            style: 0.4,
            use_speaker_boost: true
          }
        }),
      }
    );

    const buffer = await res.arrayBuffer();
    const base64 = arrayBufferToBase64(buffer);

    // 🎧 Play directly from base64 (works in Expo Go on Android)
    const sound = new Audio.Sound();
    await sound.loadAsync({
      uri: `data:audio/mp3;base64,${base64}`,
    });

    await sound.playAsync();

    sound.setOnPlaybackStatusUpdate(status => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });

  } catch (err) {
    console.log("TTS ERROR:", err);
    throw err;
  }
}
