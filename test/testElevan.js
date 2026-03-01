import fs from "fs";
import { ELEVEN_API_KEY } from "../config/env.js";

async function testEleven() {
  console.log("Testing ElevenLabs…");

  const response = await fetch(
    "https://api.elevenlabs.io/v1/text-to-speech/eleven_multilingual_v2",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVEN_API_KEY,
      },
      body: JSON.stringify({
        text: "Jesus is with you always. Do not fear.",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.7,
          style: 0.2,
          use_speaker_boost: true,
        },
      }),
    }
  );

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync("eleven_test.mp3", buffer);
  console.log("Saved: eleven_test.mp3");
}

testEleven();
