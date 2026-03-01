import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#8B5E3C",
  },

  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: "#5A3E2B",
    marginBottom: 5,
  },

  typeLabel: {
    textAlign: "center",
    fontSize: 14,
    color: "#A07C5A",
    marginBottom: 20,
    fontWeight: "600",
  },

  scroll: {
    marginBottom: 90,
  },

  section: {
    marginBottom: 20,
  },

  box: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E6D2C1",
  },

  boxTitle: {
    color: "#8B5E3C",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
  },

  boxText: {
    color: "#5A3E2B",
    fontSize: 15,
  },

  playBtn: {
    position: "absolute",
    bottom: 90,
    right: 25,
    backgroundColor: "#8B5E3C",
    padding: 14,
    borderRadius: 40,
  },

  playIcon: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  deleteBtn: {
    position: "absolute",
    bottom: 20,
    left: 25,
    backgroundColor: "#D56B5B",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
  },

  deleteText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  audioOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  audioText: {
    color: "white",
    marginTop: 12,
  },
});
