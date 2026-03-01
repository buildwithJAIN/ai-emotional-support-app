import { Text, View } from "react-native";
import styles from "../styles/_bookmarksStyle";

export default function BookmarksView() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarks</Text>

      <Text style={styles.emptyText}>
        You don't have any bookmarks yet.
      </Text>

      <Text style={styles.subText}>
        Verses you save will appear here.
      </Text>
    </View>
  );
}
