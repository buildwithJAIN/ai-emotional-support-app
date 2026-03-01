// views/_prayerView.js
import { useEffect, useState } from "react";
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

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../config/supabaseConfig";

import { OPENAI_API_KEY } from "../config/env";
import { playTTS } from "../services/ttsService";
import styles from "../styles/_prayerStyle";

const LANGUAGES = [
  { label: "English", code: "en" },
  { label: "Hindi", code: "hi" },
  { label: "Malayalam", code: "ml" },
  { label: "Tamil", code: "ta" },
  { label: "Telugu", code: "te" },
  { label: "Kannada", code: "kn" },
  { label: "Spanish", code: "es" },
  { label: "French", code: "fr" },
  { label: "German", code: "de" },
  { label: "Arabic", code: "ar" },
];

export default function PrayerView() {
  const [topic, setTopic] = useState("");
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [prayer, setPrayer] = useState("");

  const [authId, setAuthId] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  // Load login / guest state
  useEffect(() => {
    const fetchUser = async () => {
      const id = await AsyncStorage.getItem("auth_id");
      const guest = await AsyncStorage.getItem("guest");

      if (id) setAuthId(id);
      if (guest === "true") setIsGuest(true);
    };
    fetchUser();
  }, []);

  const generatePrayer = async () => {
    Keyboard.dismiss();

    if (!topic.trim()) {
      Alert.alert("Missing topic", "Please enter what you want prayer for.");
      return;
    }

    setLoading(true);
    setPrayer("");

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
You are a Christian prayer assistant.
You only create Bible-faithful Christian prayers.
You NEVER mention other religions, gods, or books.
Prayer must be one full paragraph.
              `,
            },
            {
              role: "user",
              content: `
Language: ${selectedLang.label}
Prayer topic: "${topic}"

Write ONE full prayer in ${selectedLang.label}.
ONLY prayer text.
              `,
            },
          ],
        }),
      });

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content?.trim();

      if (!text) throw new Error("No prayer generated");

      setPrayer(text);
    } catch (err) {
      console.log("PRAYER ERROR:", err);
      Alert.alert("Error", "Unable to generate prayer. Please try again.");
    }

    setLoading(false);
  };

  const playPrayer = async () => {
    if (!prayer) return;

    try {
      setSpeaking(true);
      await playTTS(prayer, selectedLang.code);
    } catch {
      Alert.alert("Audio Error", "Unable to play the prayer audio.");
    }
    setSpeaking(false);
  };

  // ⭐ Save Bookmark
  const bookmarkPrayer = async () => {
    if (!authId || isGuest) {
      Alert.alert("Login Required", "Please login to save bookmarks.");
      return;
    }

    if (!prayer) return;

    try {
      // prevent duplicates
      const { data: existing } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_auth_id", authId)
        .eq("type", "prayer")
        .eq("title", topic.trim());

      if (existing && existing.length > 0) {
        Alert.alert("Already Saved", "This prayer is already bookmarked.");
        return;
      }

      const { error } = await supabase.from("bookmarks").insert([
        {
          user_auth_id: authId,
          type: "prayer",
          title: topic.trim(),
          content: {
            prayer: prayer,
            language: selectedLang.label
          },
        },
      ]);

      if (error) throw error;

      Alert.alert("Saved", "Prayer bookmarked successfully!");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Could not save bookmark.");
    }
  };

  const isGenerateDisabled = loading || speaking;
  const isPlayDisabled = !prayer || speaking;

  return (
    <View style={styles.container}>
      
      {/* Header with bookmark */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Prayer Generator</Text>

        {prayer !== "" && (
          <TouchableOpacity style={styles.bookmarkBtn} onPress={bookmarkPrayer}>
            <Ionicons name="bookmark" size={28} color="#8B5E3C" />
          </TouchableOpacity>
        )}
      </View>

      {/* TOP */}
      <View style={styles.topSection}>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.langRow}>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.langChip,
                selectedLang.code === lang.code && styles.langChipActive,
              ]}
              onPress={() => setSelectedLang(lang)}
              disabled={isGenerateDisabled}
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

        <TextInput
          style={styles.input}
          multiline
          placeholder={`What do you want prayer for? (in ${selectedLang.label})`}
          placeholderTextColor="#8E6E4E"
          value={topic}
          onChangeText={setTopic}
          editable={!isGenerateDisabled}
        />

        <TouchableOpacity
          style={[styles.button, isGenerateDisabled && styles.buttonDisabled]}
          onPress={generatePrayer}
          disabled={isGenerateDisabled}
        >
          <Text style={styles.buttonText}>
            {loading ? "Generating..." : "Generate Prayer"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* OUTPUT */}
      <View style={styles.bottomSection}>
        {prayer ? (
          <ScrollView style={styles.prayerBox}>
            <Text style={styles.prayerText}>{prayer}</Text>
          </ScrollView>
        ) : null}
      </View>

      {/* Floating Play */}
      {prayer && (
        <TouchableOpacity
          style={[styles.floatingPlay, speaking && styles.floatingPlayDisabled]}
          onPress={playPrayer}
          disabled={speaking}
        >
          <Text style={styles.floatingPlayIcon}>▶</Text>
        </TouchableOpacity>
      )}

      {/* Audio Overlay */}
      {speaking && (
        <View style={styles.audioOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.audioOverlayText}>Playing prayer…</Text>
        </View>
      )}
    </View>
  );
}
