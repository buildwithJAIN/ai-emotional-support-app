import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5A3E2B",
    textAlign: "center",
    marginBottom: 20,
  },

  loadingScreen: {
    flex: 1,
    backgroundColor: "#FFF9F0",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#8B5E3C",
    fontSize: 16,
  },

  filterRow: {
    flexGrow: 0,
    marginBottom: 20,
  },

  filterChip: {
    backgroundColor: "#E7D9C5",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },

  filterChipActive: {
    backgroundColor: "#8B5E3C",
  },

  filterChipText: {
    color: "#5A3E2B",
    fontWeight: "600",
  },

  filterChipTextActive: {
    color: "#FFF",
  },

  emptyBox: {
    marginTop: 80,
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyText: {
    fontSize: 18,
    color: "#5A3E2B",
    fontWeight: "700",
    marginBottom: 8,
  },

  emptySub: {
    fontSize: 14,
    color: "#8B5E3C",
    textAlign: "center",
  },

  scroll: {
    marginBottom: 70,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5D5C2",
  },

  cardType: {
    color: "#A07C5A",
    fontWeight: "700",
    marginBottom: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5A3E2B",
    marginBottom: 8,
  },

  cardPreview: {
    color: "#6F4E37",
    fontSize: 14,
    marginBottom: 12,
  },

  cardButton: {
    backgroundColor: "#8B5E3C",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  cardButtonText: {
    color: "#FFF",
    fontWeight: "700",
  },
});
