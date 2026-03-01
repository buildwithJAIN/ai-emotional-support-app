import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../config/supabaseConfig";

import { playTTS } from "../services/ttsService";
import styles from "../styles/_shareThoughtStyle";

const LANGUAGES = [
  { label: "English", code: "en" },
  { label: "Hindi", code: "hi" },
  { label: "Malayalam", code: "ml" },
  { label: "Tamil", code: "ta" },
  { label: "Spanish", code: "es" },
  { label: "French", code: "fr" },
  { label: "German", code: "de" },
  { label: "Arabic", code: "ar" },
];

export default function ShareThoughtView() {
  const [thought, setThought] = useState("");
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [response, setResponse] = useState(null);
  const [authId, setAuthId] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  const uiDisabled = speaking || loading;

  // 🔍 Load login / guest state
  useEffect(() => {
    const loadUser = async () => {
      const id = await AsyncStorage.getItem("auth_id");
      const guest = await AsyncStorage.getItem("guest");

      if (id) setAuthId(id);
      if (guest === "true") setIsGuest(true);
    };
    loadUser();
  }, []);

  const generateResponse = async () => {
    Keyboard.dismiss();

    if (!thought.trim()) {
      Alert.alert("Please enter something first");
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";

      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `
You are a Christian devotional AI.
Use ONLY the NIV Bible word-for-word for the verse.
Translate ONLY the message and story into ${selectedLang.label}.
Return JSON ONLY.

User thought: "${thought}"

Return JSON:

{
  "version": "NIV",
  "reference": "Book Chapter:Verse",
  "verse": "Exact NIV verse only",
  "message": "3–4 line comforting message translated to ${selectedLang.label}",
  "story": "Short relatable uplifting story (80–120 words) translated to ${selectedLang.label}"
}
                  `,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await geminiResponse.json();

      const rawText =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const cleaned = rawText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const output = JSON.parse(cleaned);

      setResponse(output);
    } catch (err) {
      console.log("ERROR:", err);
      Alert.alert("Error", "Something went wrong.");
    }

    setLoading(false);
  };

  const playAudio = async () => {
    if (!response) return;

    const fullText =
      `${response.reference}. ${response.verse}. ${response.message}. ${response.story}.`;

    try {
      setSpeaking(true);
      await playTTS(fullText, selectedLang.code);
    } catch (e) {
      Alert.alert("Audio Error", "Unable to play audio.");
    }

    setSpeaking(false);
  };

  // ⭐ SAVE BOOKMARK
  const saveBookmark = async () => {
    if (!authId || isGuest) {
      Alert.alert(
        "Login Required",
        "Please login to save bookmarks."
      );
      return;
    }

    if (!response) return;

    try {
      // prevent duplicates
      const { data: existing } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_auth_id", authId)
        .eq("type", "thought")
        .eq("title", thought.trim());

      if (existing && existing.length > 0) {
        Alert.alert("Already Saved", "This thought is already bookmarked.");
        return;
      }

      const { error } = await supabase.from("bookmarks").insert([
        {
          user_auth_id: authId,
          type: "thought",
          title: thought.trim(),
          content: response,
        },
      ]);

      if (error) {
        console.log(error);
        Alert.alert("Error", "Unable to save bookmark.");
      } else {
        Alert.alert("Saved", "Thought has been bookmarked.");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>

      {/* ---------- HEADER: Title + Bookmark Button ---------- */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Share Your Thought</Text>

        {response && (
          <TouchableOpacity
            onPress={saveBookmark}
            style={styles.bookmarkBtn}
          >
            <Ionicons name="bookmark" size={28} color="#8B5E3C" />
          </TouchableOpacity>
        )}
      </View>

      {/* ---------- TOP SECTION ---------- */}
      <View style={styles.topSection}>

        {/* Language Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.langScroll}
        >
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              disabled={uiDisabled}
              onPress={() => setSelectedLang(lang)}
              style={[
                styles.langChip,
                selectedLang.code === lang.code && styles.langChipActive,
                uiDisabled && { opacity: 0.3 }
              ]}
            >
              <Text
                style={[
                  styles.langChipText,
                  selectedLang.code === lang.code && styles.langChipTextActive,
                ]}
              >
                {lang.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Thought Input */}
        <TextInput
          editable={!uiDisabled}
          style={[styles.input, uiDisabled && { opacity: 0.5 }]}
          multiline
          numberOfLines={4}
          placeholder={`Write your thought in ${selectedLang.label} or English…`}
          placeholderTextColor="#8E6E4E"
          value={thought}
          onChangeText={setThought}
        />

        {/* Generate Button */}
        <TouchableOpacity
          disabled={uiDisabled}
          style={[
            styles.button,
            uiDisabled && { opacity: 0.4 }
          ]}
          onPress={generateResponse}
        >
          <Text style={styles.buttonText}>
            {loading ? "Generating..." : "Generate"}
          </Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#8B5E3C"
          style={{ marginTop: 10 }}
        />
      )}

      {/* ---------- OUTPUT ---------- */}
      {response && (
        <ScrollView
          style={styles.scrollOutput}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.box}>
            <Text style={styles.boxTitle}>{response.reference}</Text>
            <Text style={styles.verse}>{response.verse}</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.boxTitle}>Message</Text>
            <Text style={styles.message}>{response.message}</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.boxTitle}>Story</Text>
            <Text style={styles.story}>{response.story}</Text>
          </View>
        </ScrollView>
      )}

      {/* Floating Play Button */}
      {response && (
        <TouchableOpacity
          disabled={uiDisabled}
          onPress={playAudio}
          style={[
            styles.floatingPlay,
            uiDisabled && { opacity: 0.3 }
          ]}
        >
          <Text style={{ color: "white", fontSize: 22 }}>▶</Text>
        </TouchableOpacity>
      )}

      {speaking && (
        <View style={styles.audioOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: "white", marginTop: 10 }}>Playing audio…</Text>
        </View>
      )}
    </View>
  );
}
