import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0",
  },

  /* TOP SECTION */
  topSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5A3E2B",
    textAlign: "center",
    marginBottom: 8,
  },

  langRow: {
    marginTop: 4,
    marginBottom: 10,
  },

  langChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#E8D8C3",
    borderRadius: 18,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#D8C4A3",
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
    fontSize: 13,
    fontWeight: "700",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D8C4A3",
    padding: 12,
    fontSize: 15,
    minHeight: 70,
    textAlignVertical: "top",
    color: "#5A3E2B",
    marginTop: 4,
  },

  button: {
    backgroundColor: "#8B5E3C",
    padding: 13,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  /* BOTTOM SECTION (lyrics) */
  bottomSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 70,
  },

  songBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E3D2BD",
    padding: 16,
  },

  songTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8B5E3C",
    marginBottom: 10,
    textAlign: "center",
  },

  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6F4E37",
    marginTop: 8,
    marginBottom: 4,
  },

  lyrics: {
    fontSize: 15,
    color: "#5A3E2B",
    lineHeight: 22,
  },

  /* Floating play button */
  floatingPlay: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#8B5E3C",
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  floatingPlayDisabled: {
    opacity: 0.5,
  },

  floatingPlayIcon: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  /* Audio overlay */
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

  audioOverlayText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },
});

export default styles;
