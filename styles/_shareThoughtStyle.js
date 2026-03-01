import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF9F0",
  },

  /* ---------- HEADER WITH BOOKMARK ---------- */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  bookmarkBtn: {
    padding: 6,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5A3E2B",
    textAlign: "center",
    flex: 1,
  },

  /* ---------- TOP SECTION ---------- */
  topSection: {
    paddingBottom: 10,
  },

  langScroll: {
    marginBottom: 12,
  },

  langChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#E8D8C3",
    borderRadius: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#D8C4A3",
    height: 34,
    justifyContent: "center",
  },

  langChipActive: {
    backgroundColor: "#8B5E3C",
    borderColor: "#6D452A",
  },

  langChipText: {
    color: "#5A3E2B",
    fontSize: 13,
    fontWeight: "600",
  },

  langChipTextActive: {
    color: "white",
    fontWeight: "700",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D8C4A3",
    padding: 14,
    fontSize: 15,
    height: 120,
    textAlignVertical: "top",
    color: "#5A3E2B",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#8B5E3C",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  /* ---------- OUTPUT SECTION ---------- */
  scrollOutput: {
    marginTop: 10,
    marginBottom: 80,
  },

  box: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E3D2BD",
    marginBottom: 18,
  },

  boxTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#8B5E3C",
    marginBottom: 8,
  },

  verse: {
    fontSize: 15,
    color: "#6F4E37",
    lineHeight: 22,
  },

  message: {
    fontSize: 15,
    color: "#5A3E2B",
    lineHeight: 22,
  },

  story: {
    fontSize: 15,
    color: "#5A3E2B",
    lineHeight: 22,
  },

  /* ---------- FLOATING PLAY BTN ---------- */
  floatingPlay: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#8B5E3C",
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  /* ---------- AUDIO OVERLAY ---------- */
  audioOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

});

export default styles;
