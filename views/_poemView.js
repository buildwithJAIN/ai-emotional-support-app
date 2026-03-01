import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { OPENAI_API_KEY } from "../config/env";
import { playTTS } from "../services/ttsService";
import styles from "../styles/_poemStyle"; // still using same style

export default function PoemView() {
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [poem, setPoem] = useState(null);

  const uiDisabled = loading || speaking;

  const generatePoem = async () => {
    Keyboard.dismiss();

    if (!theme.trim()) {
      Alert.alert("Missing theme", "Please enter a poem theme.");
      return;
    }

    setLoading(true);
    setPoem(null);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1",
          messages: [
            {
              role: "system",
              content: `
You write Christian devotional poems in simple English.

STRICT POEM RULES:
• ONLY English
• EXACTLY 4 stanzas
• EACH stanza has 4 short lines
• EVERY line MUST end with a comma
• Within each stanza:
    - Line 1 last word rhymes with line 2 last word
    - Line 2 rhymes with line 3
    - Line 3 rhymes with line 4
• Content must be uplifting, emotional, faith-based.
• NEVER mention other religions or concepts.

Return JSON ONLY:

{
  "title": "string",
  "stanza1": "line1\\nline2\\nline3\\nline4",
  "stanza2": "line1\\nline2\\nline3\\nline4",
  "stanza3": "line1\\nline2\\nline3\\nline4",
  "stanza4": "line1\\nline2\\nline3\\nline4"
}
              `,
            },
            {
              role: "user",
              content: `
Poem theme: "${theme}"
Write poem in English only.
Return only JSON.
              `,
            },
          ],
        }),
      });

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) throw new Error("No poem generated");

      const parsed = JSON.parse(content);
      setPoem(parsed);

    } catch (err) {
      console.log("POEM ERROR:", err);
      Alert.alert("Error", "Could not generate the poem. Try again.");
    }

    setLoading(false);
  };

  const buildPoemText = (poemObj) => {
    return `
${poemObj.title}

${poemObj.stanza1}

${poemObj.stanza2}

${poemObj.stanza3}

${poemObj.stanza4}
    `;
  };

  const playPoem = async () => {
    if (!poem) return;

    const text = buildPoemText(poem);

    try {
      setSpeaking(true);
      await playTTS(text, "en");
    } catch {
      Alert.alert("Audio Error", "Unable to play the poem.");
    }

    setSpeaking(false);
  };

  return (
    <View style={styles.container}>
      
      {/* TOP SECTION */}
      <View style={styles.topSection}>
        <Text style={styles.title}>Poem Generator</Text>

        <TextInput
          style={[styles.input, uiDisabled && { opacity: 0.6 }]}
          editable={!uiDisabled}
          multiline
          placeholder="Enter poem theme (e.g., 'Hope in Jesus')"
          placeholderTextColor="#8E6E4E"
          value={theme}
          onChangeText={setTheme}
        />

        <TouchableOpacity
          disabled={uiDisabled}
          style={[styles.button, uiDisabled && styles.buttonDisabled]}
          onPress={generatePoem}
        >
          <Text style={styles.buttonText}>
            {loading ? "Generating..." : "Generate Poem"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* LOADER */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#8B5E3C"
          style={{ marginTop: 12 }}
        />
      )}

      {/* POEM OUTPUT */}
      {poem && (
        <ScrollView style={styles.songBox} showsVerticalScrollIndicator={false}>
          <Text style={styles.songTitle}>{poem.title}</Text>

          {[1, 2, 3, 4].map((s) => (
            <View key={s} style={{ marginBottom: 20 }}>
              <Text style={styles.sectionLabel}>Stanza {s}</Text>
              <Text style={styles.lyrics}>{poem[`stanza${s}`]}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {/* PLAY BUTTON */}
      {poem && (
        <TouchableOpacity
          disabled={uiDisabled}
          style={[
            styles.floatingPlay,
            uiDisabled && styles.floatingPlayDisabled,
          ]}
          onPress={playPoem}
        >
          <Text style={styles.floatingPlayIcon}>▶</Text>
        </TouchableOpacity>
      )}

      {/* AUDIO OVERLAY */}
      {speaking && (
        <View style={styles.audioOverlay}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.audioOverlayText}>Playing poem…</Text>
        </View>
      )}

    </View>
  );
}
