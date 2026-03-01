import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
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
import styles from "../styles/_bookmarksStyle";
const FILTERS = ["All", "Tag", "Thought", "Prayer", "Poem"];

export default function BookmarksView() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [bookmarks, setBookmarks] = useState([]);
  const [filtered, setFiltered] = useState([]);
    
  const router = useRouter();
  // ⭐ Login check
  const checkLogin = async () => {
    const authId = await AsyncStorage.getItem("auth_id");

    if (!authId) {
      Alert.alert(
        "Login Required",
        "Please create an account or login to view your saved bookmarks."
      );
      setLoading(false);
      return false;
    }

    return authId;
  };

  // ⭐ Fetch bookmarks from Supabase
  const fetchBookmarks = async () => {
    const authId = await checkLogin();
    if (!authId) return;

    try {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_auth_id", authId)
        .order("created_at", { ascending: false });

      if (error) {
        console.log("BOOKMARK FETCH ERROR:", error);
        Alert.alert("Error", "Unable to load bookmarks.");
      } else {
        setBookmarks(data || []);
        setFiltered(data || []);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  // ⭐ Filter logic
  useEffect(() => {
    if (filter === "All") {
      setFiltered(bookmarks);
    } else {
      const lower = filter.toLowerCase();
      setFiltered(bookmarks.filter((b) => b.type === lower));
    }
  }, [filter, bookmarks]);

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#8B5E3C" />
        <Text style={styles.loadingText}>Loading bookmarks…</Text>
      </View>
    );
  }

  return (
  <View style={styles.container}>
    
    <Text style={styles.title}>Your Bookmarks</Text>

    {/* ⭐ FILTER CHIPS */}
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterRow}
    >
      {FILTERS.map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => setFilter(item)}
          style={[
            styles.filterChip,
            filter === item && styles.filterChipActive,
          ]}
        >
          <Text
            style={[
              styles.filterChipText,
              filter === item && styles.filterChipTextActive,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    {/* ⭐ EMPTY VIEW */}
    {filtered.length === 0 ? (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>
          You don’t have any bookmarks yet.
        </Text>
        <Text style={styles.emptySub}>
          Start exploring and save your favorite verses, poems, and messages.
        </Text>
      </View>
    ) : (
      <ScrollView style={styles.scroll}>
        {filtered.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/bookmarkDetails",
                params: { id: item.id },
              })
            }
          >
            <Text style={styles.cardType}>{item.type.toUpperCase()}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>

            <Text numberOfLines={3} style={styles.cardPreview}>
              {item.audio_text?.slice(0, 130)}...
            </Text>

            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Open</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    )}
  </View>
);

}
