import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  scroll: {
    paddingBottom: 120,
  },

  header: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#5A3E2B",
    textAlign: "center",
    marginBottom: 30,
  },

  box: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#D8C4A3",
  },

  boxTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8B5E3C",
    marginBottom: 6,
  },

  verse: {
    fontSize: 16,
    color: "#5A3E2B",
    lineHeight: 22,
  },

  message: {
    fontSize: 15,
    color: "#6F4E37",
    lineHeight: 22,
  },

  story: {
    fontSize: 15,
    color: "#6F4E37",
    lineHeight: 22,
  },

  playBtn: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#8B5E3C",
    padding: 20,
    borderRadius: 50,
    elevation: 5,
  },

  playText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#5A3E2B",
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
  zIndex: 20,
},
bookmarkBtn: {
  position: "absolute",
  top: 40,
  right: 20,
  backgroundColor: "#E6D7C4",
  padding: 10,
  borderRadius: 30,
  zIndex: 20,
  elevation: 5,
},

bookmarkIcon: {
  fontSize: 22,
  color: "#5A3E2B",
  fontWeight: "bold",
},

});
