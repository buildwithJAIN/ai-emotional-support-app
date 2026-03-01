import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#5A3E2B",
    textAlign: "center",
    marginBottom: 25,
  },

  scroll: {
    marginTop: 10,
  },

  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 30,
    justifyContent: "center",
  },

  tagChip: {
    backgroundColor: "#E7D9C5",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    margin: 6,
  },

  tagText: {
    color: "#5A3E2B",
    fontWeight: "600",
    fontSize: 15,
  },
});
