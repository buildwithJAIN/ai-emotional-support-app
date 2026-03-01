import { OPENAI_API_KEY } from "../config/env.js";

async function testOpenAI() {
  console.log("Testing OpenAI…",OPENAI_API_KEY);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a Christian assistant. Only give Bible-based answers.",
        },
        {
          role: "user",
          content: `
          User Thought: "I feel anxious."

          Give:
          1. Bible Verse
          2. Reference
          3. Short message
          4. Short story
          Format as JSON exactly like:

          {
            "verse": "...",
            "reference": "...",
            "message": "...",
            "story": "..."
          }
          `,
        },
      ],
    }),
  });

  const json = await response.json();
  console.log("OpenAI RESULT:\n", json);
}

testOpenAI();
