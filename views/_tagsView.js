import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { OPENAI_API_KEY } from "../config/env";
import styles from "../styles/_tagsStyle";

export default function TagsView() {
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTags = async () => {
    setLoading(true);

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
Generate 80–100 emotional tags.
Return ONLY JSON array of strings.
              `,
            },
          ],
        }),
      });

      const json = await response.json();
      const arr = JSON.parse(json.choices[0].message.content);

      setTags(arr);

    } catch (err) {
      console.log("TAG ERROR:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Emotion Tags</Text>

      {loading && (
        <ActivityIndicator size="large" color="#8B5E3C" style={{ marginTop: 20 }} />
      )}

      {/* Tag list */}
      {!loading && (
        <ScrollView style={styles.scroll}>
          <View style={styles.tagContainer}>
            {tags.map((tag, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tagChip}
                onPress={() =>
                  router.push({ pathname: "/tagDetails", params: { tag } })
                }
              >
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

    </View>
  );
}
