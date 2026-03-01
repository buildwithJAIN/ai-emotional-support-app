import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkAuth = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Auth check error:", error);
    return false;
  }
};
