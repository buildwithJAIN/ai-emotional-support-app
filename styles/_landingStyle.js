import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#5A3E2B",
    marginBottom: 10,
  },

  tagline: {
    fontSize: 16,
    color: "#6F4E37",
    marginBottom: 30,
    textAlign: "center",
    width: "80%",
  },

  input: {
    backgroundColor: "#FFFFFF",
    width: "85%",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D8C4A3",
    color: "#5A3E2B",
    fontSize: 16,
  },

  button: {
    backgroundColor: "#8B5E3C",
    paddingVertical: 14,
    borderRadius: 12,
    width: "85%",
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  infoText: {
    color: "#6F4E37",
    fontSize: 15,
    marginTop: 20,
    textAlign: "center",
  },

  link: {
    color: "#8B5E3C",
    fontWeight: "bold",
  },

  featureText: {
    color: "#A07C5A",
    fontSize: 13,
    width: "80%",
    textAlign: "center",
    marginTop: 20,
  },

  // ⭐ Existing
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5A3E2B",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },

  logoutButton: {
    position: "absolute",
    top: 40,
    right: 25,
    backgroundColor: "#E4D3C2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  logoutText: {
    color: "#5A3E2B",
    fontWeight: "600",
    fontSize: 14,
  },

  // ⭐ NEW — Guest Mode Button
  guestButton: {
    borderWidth: 1.2,
    borderColor: "#8B5E3C",
    borderRadius: 12,
    paddingVertical: 12,
    width: "85%",
    alignItems: "center",
    marginTop: 15,
  },

  guestText: {
    color: "#8B5E3C",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;
