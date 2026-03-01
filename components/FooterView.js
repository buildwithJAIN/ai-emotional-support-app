import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function FooterView({ current }) {
  const router = useRouter();

  // ⭐ BOOKMARK CHECK FUNCTION
  const handleBookmarksPress = async () => {
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

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#FFF2E0",
        borderTopColor: "#E8D8C5",
        borderTopWidth: 1,
        paddingVertical: 10,
        justifyContent: "space-between",
      }}
    >
      {/* Home */}
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
        }}
        onPress={() => router.push("/")}
      >
        <Ionicons
          name="home"
          size={28}
          color={current === "home" ? "#8B5E3C" : "#A07C5A"}
        />
        <Text
          style={{
            color: current === "home" ? "#8B5E3C" : "#A07C5A",
            fontSize: 12,
            marginTop: 4,
          }}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* Bookmarks */}
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
        }}
        onPress={handleBookmarksPress}   // ⭐ UPDATED
      >
        <Ionicons
          name="bookmark"
          size={28}
          color={current === "bookmarks" ? "#8B5E3C" : "#A07C5A"}
        />
        <Text
          style={{
            color: current === "bookmarks" ? "#8B5E3C" : "#A07C5A",
            fontSize: 12,
            marginTop: 4,
          }}
        >
          Bookmarks
        </Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
        }}
        onPress={() => router.push("/profile")}
      >
        <Ionicons
          name="person"
          size={28}
          color={current === "profile" ? "#8B5E3C" : "#A07C5A"}
        />
        <Text
          style={{
            color: current === "profile" ? "#8B5E3C" : "#A07C5A",
            fontSize: 12,
            marginTop: 4,
          }}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}
