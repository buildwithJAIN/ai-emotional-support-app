import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../config/supabaseConfig";
import styles from "../styles/_landingStyle";

export default function LandingView() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedInName, setLoggedInName] = useState(null);
  const [loggedInEmail, setLoggedInEmail] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  const [loading, setLoading] = useState(true);

  // 🔍 Check saved login or guest mode when screen loads
  useEffect(() => {
    const checkAuth = async () => {
      const storedName = await AsyncStorage.getItem("name");
      const storedEmail = await AsyncStorage.getItem("email");
      const guestMode = await AsyncStorage.getItem("guest");

      if (storedName) setLoggedInName(storedName);
      if (storedEmail) setLoggedInEmail(storedEmail);
      if (guestMode === "true") setIsGuest(true);

      setLoading(false);
    };

    checkAuth();
  }, []);

  // ⭐ OPEN BOOKMARKS BUTTON HANDLER
  const openBookmarks = async () => {
    const authId = await AsyncStorage.getItem("auth_id");

    if (!authId) {
      Alert.alert(
        "Login Required",
        "Please create an account or login to view your saved bookmarks."
      );
      return;
    }

    router.push("/bookmarks");
  };

  // ⭐ Guest Mode Handler
  const handleGuest = async () => {
    await AsyncStorage.setItem("guest", "true"); 
    setIsGuest(true);
    router.push("/feature");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter email and password.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("Login Error", error.message);
      return;
    }

    const user = data.user;

    // ⭐ Fetch user name using auth_id
    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .select("name")
      .eq("auth_id", user.id)
      .single();

    if (profileError) {
      console.log("Profile fetch error:", profileError);
    }

    const userName = profileData?.name || "User";

    // Save to storage
    await AsyncStorage.setItem("auth_id", user.id);
    await AsyncStorage.setItem("email", user.email);
    await AsyncStorage.setItem("name", userName);
    await AsyncStorage.removeItem("guest");

    setLoggedInName(userName);

    Alert.alert("Success", "Logged in successfully!");
  };

  // 🔥 Logout logic
  const handleLogout = () => {
  Alert.alert(
    "Logout",
    "Do you want to log out?",
    [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          await supabase.auth.signOut();   // ⭐ VERY IMPORTANT
          await AsyncStorage.clear();

          setLoggedInEmail(null);
          setLoggedInName(null);
          setIsGuest(false);
        },
      },
    ]
  );
};


  if (loading) {
    return <View style={styles.container}></View>;
  }

  return (
    <View style={styles.container}>

      {/* LOGOUT BUTTON */}
      {(loggedInName || isGuest) && (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      )}

      {/* ⭐ BOOKMARKS BUTTON
      <TouchableOpacity
        style={styles.bookmarkButton}
        onPress={openBookmarks}
      >
        <Text style={styles.bookmarkIcon}>🔖</Text>
      </TouchableOpacity> */}

      <Text style={styles.title}>Talking Bible</Text>

      <Text style={styles.tagline}>
        Find Strength. Gain Peace. Walk with Hope.
      </Text>

      {/* ⭐ IF LOGGED IN → SHOW WELCOME */}
      {loggedInName ? (
        <>
          <Text style={styles.welcomeText}>
            Welcome, {loggedInName} 👋
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/feature")}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <Text style={styles.featureText}>
            You can now bookmark verses, enjoy audio listening,
            and share your spiritual thoughts.
          </Text>
        </>
      ) : isGuest ? (
        <>
          <Text style={styles.welcomeText}>
            Welcome, Guest 🙏
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/feature")}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <Text style={styles.featureText}>
            Guest mode has limited features.  
            Create an account anytime to unlock all features.
          </Text>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#8E6E4E"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8E6E4E"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={styles.infoText}>
              New to the app? <Text style={styles.link}>Create Account</Text>
            </Text>
          </TouchableOpacity>

          {/* ⭐ CONTINUE AS GUEST BUTTON */}
          <TouchableOpacity
            style={styles.guestButton}
            onPress={handleGuest}
          >
            <Text style={styles.guestText}>Continue as Guest</Text>
          </TouchableOpacity>

          <Text style={styles.featureText}>
            Guest mode allows you to explore Tags.  
            Login to unlock bookmarks, audio, and thought sharing.
          </Text>
        </>
      )}
    </View>
  );
}
