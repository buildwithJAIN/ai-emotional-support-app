import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/_featureStyle";

export default function FeaturesView() {
  const router = useRouter();

  // 🔐 Reusable function to check user login
  const checkLogin = async () => {
  try {
    const authId = await AsyncStorage.getItem("auth_id");
    const guest = await AsyncStorage.getItem("guest");

    // Logged-in users OR guests (handled differently)
    if (authId) return true;
    if (guest === "true") return false; 

    return false;
  } catch (e) {
    console.log("Login check error:", e);
    return false;
  }
}

  // 🔐 Protect navigation
  const handleProtectedPress = async (path) => {
  const loggedIn = await checkLogin();

  if (!loggedIn) {
    Alert.alert(
      "Login Required",
      "Please create an account or login to access this feature."
    );
    return;
  }

  router.push(path);
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Features</Text>

      {/* TAGS (FREE ACCESS) */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/tags")}
      >
        <Text style={styles.cardTitle}>Tags</Text>
        <Text style={styles.cardDesc}>
          Explore Bible-based tags like Peace, Faith, Strength, Healing…
        </Text>
      </TouchableOpacity>

      {/* SHARE THOUGHT (LOGIN REQUIRED) */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleProtectedPress("/shareThought")}
      >
        <Text style={styles.cardTitle}>Share Your Thought</Text>
        <Text style={styles.cardDesc}>
          Tell us what you're feeling and get an AI-guided verse, message, and explanation.
        </Text>
      </TouchableOpacity>

      {/* PRAYER (LOGIN REQUIRED) */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleProtectedPress("/prayer")}
      >
        <Text style={styles.cardTitle}>Prayer</Text>
        <Text style={styles.cardDesc}>
          Learn how to pray based on your situation in your selected language.
        </Text>
      </TouchableOpacity>

      {/* POEM (LOGIN REQUIRED) */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleProtectedPress("/poem")}
      >
        <Text style={styles.cardTitle}>Poem</Text>
        <Text style={styles.cardDesc}>Listen to AI generated poems</Text>
      </TouchableOpacity>
    </View>
  );
}
