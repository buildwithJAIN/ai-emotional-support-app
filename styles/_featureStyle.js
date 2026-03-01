import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0",
    paddingHorizontal: 25,
    paddingTop: 60,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#5A3E2B",
    alignSelf: "center",
    marginBottom: 40,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 14,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#D8C4A3",
    elevation: 3,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#5A3E2B",
    marginBottom: 6,
  },

  cardDesc: {
    fontSize: 15,
    color: "#6F4E37",
    lineHeight: 20,
  },
});
export default styles