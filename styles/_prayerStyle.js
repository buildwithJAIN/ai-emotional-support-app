// styles/_prayerStyle.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0",
  },

  /* ===================== */
  /*   TOP 30% SECTION     */
  /* ===================== */

  topSection: {
    flex: 0.32,
    padding: 20,
    justifyContent: "flex-start",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5A3E2B",
    textAlign: "center",
    marginBottom: 10,
  },

  langRow: {
    marginTop: 5,
    marginBottom: 0,
  },

  langChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#E8D8C3",
    borderRadius: 18,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#D8C4A3",
    height:35
  },
  headerRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},

bookmarkBtn: {
  padding: 6,
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
    minHeight: 80,
    textAlignVertical: "top",
    color: "#5A3E2B",
    marginTop: 5,
  },

  button: {
    backgroundColor: "#8B5E3C",
    padding: 13,
    borderRadius: 12,
    marginTop: 12,
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

  /* ===================== */
  /*   BOTTOM 70% SECTION  */
  /* ===================== */

  bottomSection: {
    flex: 0.68,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  prayerBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E3D2BD",
    padding: 16,
  },

  prayerText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#5A3E2B",
  },

  /* Floating Play Button */

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
