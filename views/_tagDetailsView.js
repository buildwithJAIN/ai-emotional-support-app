import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { OPENAI_API_KEY } from "../config/env";
import { saveBookmark } from "../services/bookmarkService"; // ⭐ ADD THIS
import { playTTS } from "../services/ttsService";
import styles from "../styles/_tagDetailsStyle";

export default function TagDetailsView() {
  const { tag } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const uiDisabled = speaking || loading;

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
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
You are a Christian devotional AI.
Use ONLY the NIV Bible for verses.
Return JSON only.
              `,
            },
            {
              role: "user",
              content: `
Tag selected: ${tag}

Return JSON:

{
  "reference": "Book Chapter:Verse",
  "verse": "Exact NIV verse only",
  "message": "3–4 comforting devotional lines",
  "story": "Short uplifting relatable story (80–120 words)"
}
              `,
            },
          ],
        }),
      });

      const data = await response.json();
      const output = JSON.parse(data.choices[0].message.content);
      setDetails(output);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to load details.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const playAudio = async () => {
    if (!details) return;

    const fullText =
      `${details.reference}. ${details.verse}. ${details.message}. ${details.story}`;

    try {
      setSpeaking(true);
      await playTTS(fullText, "en");
    } catch {
      Alert.alert("Error", "Unable to play audio.");
    }
    setSpeaking(false);
  };

  // ⭐ BOOKMARK HANDLER
  const handleBookmark = async () => {
    if (!details) return;

    const audioText =
      `${details.reference}. ${details.verse}. ${details.message}. ${details.story}`;

    const result = await saveBookmark(
      "tag",     // type
      tag,       // title
      details,   // content
      audioText  // audioText
    );

    if (result.success) {
      Alert.alert("Saved ✔", "Bookmark added successfully.");
    } else {
      Alert.alert("Error", "Unable to save bookmark.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#8B5E3C" />
        <Text style={styles.loadingText}>Preparing...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* ⭐ BOOKMARK BUTTON */}
      <TouchableOpacity
        disabled={uiDisabled}
        style={[
          styles.bookmarkBtn,
          uiDisabled && { opacity: 0.4 }
        ]}
        onPress={handleBookmark}
      >
        <Text style={styles.bookmarkIcon}>★</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scroll}>
        <Text style={styles.header}>{tag}</Text>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>{details.reference}</Text>
          <Text style={styles.verse}>{details.verse}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Message</Text>
          <Text style={styles.message}>{details.message}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Story</Text>
          <Text style={styles.story}>{details.story}</Text>
        </View>
      </ScrollView>

      {/* PLAY BUTTON */}
      <TouchableOpacity
        onPress={playAudio}
        disabled={speaking}
        style={[
          styles.playBtn,
          speaking && { opacity: 0.4 }
        ]}
      >
        <Text style={styles.playText}>▶</Text>
      </TouchableOpacity>

      {/* AUDIO LOADING OVERLAY */}
      {speaking && (
        <View style={styles.audioOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: "white", marginTop: 10 }}>Playing audio…</Text>
        </View>
      )}

    </View>
  );
}
