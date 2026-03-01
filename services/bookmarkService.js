import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../config/supabaseConfig";

export const saveBookmark = async (type, title, content, audioText) => {
  try {
    const auth_id = await AsyncStorage.getItem("auth_id");
    if (!auth_id) return { success: false, error: "Not logged in" };

    const { error } = await supabase.from("bookmarks").insert([
      {
        user_auth_id: auth_id,
        type,
        title,
        content,
        audio_text: audioText,
      },
    ]);

    if (error) return { success: false, error };

    return { success: true };

  } catch (e) {
    console.log("BOOKMARK ERROR:", e);
    return { success: false, error: e };
  }
};
