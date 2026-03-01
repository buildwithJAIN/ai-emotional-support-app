import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { supabase } from "../config/supabaseConfig";
import { playTTS } from "../services/ttsService";
import styles from "../styles/_bookmarkDetailsStyle";

export default function BookmarkDetailsView() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [data, setData] = useState(null);

  const loadBookmark = async () => {
    const authId = await AsyncStorage.getItem("auth_id");

    if (!authId) {
      Alert.alert("Error", "Not logged in.");
      router.back();
      return;
    }

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("id", id)
      .eq("user_auth_id", authId)
      .single();

    if (error || !data) {
      Alert.alert("Error", "Bookmark not found.");
      router.back();
      return;
    }

    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    loadBookmark();
  }, []);

  const playAudio = async () => {
    if (!data || !data.audio_text) return;

    try {
      setSpeaking(true);
      await playTTS(data.audio_text, "en");
    } catch {
      Alert.alert("Error", "Unable to play audio.");
    }

    setSpeaking(false);
  };

  const deleteBookmark = async () => {
    Alert.alert("Delete Bookmark", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await supabase.from("bookmarks").delete().eq("id", id);
          Alert.alert("Deleted", "Bookmark removed.");
          router.push("/bookmarks");
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#8B5E3C" />
        <Text style={styles.loadingText}>Loading…</Text>
      </View>
    );
  }

  const { type, title, content } = data;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.typeLabel}>{type.toUpperCase()}</Text>

      <ScrollView style={styles.scroll}>
        {/* TAG / THOUGHT / PRAYER TYPE */}
        {typeof content === "object" && (
          <View style={styles.section}>
            {Object.entries(content).map(([key, value]) => (
              <View key={key} style={styles.box}>
                <Text style={styles.boxTitle}>{key.toUpperCase()}</Text>
                <Text style={styles.boxText}>{String(value)}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* PLAY BUTTON */}
      <TouchableOpacity
        disabled={speaking}
        style={[styles.playBtn, speaking && { opacity: 0.4 }]}
        onPress={playAudio}
      >
        <Text style={styles.playIcon}>▶</Text>
      </TouchableOpacity>

      {/* DELETE BUTTON */}
      <TouchableOpacity style={styles.deleteBtn} onPress={deleteBookmark}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>

      {speaking && (
        <View style={styles.audioOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.audioText}>Playing…</Text>
        </View>
      )}
    </View>
  );
}
