
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0",
    padding: 25,
  },

  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#5A3E2B",
    textAlign: "center",
    marginBottom: 30,
  },

  label: {
    color: "#6F4E37",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D8C4A3",
    fontSize: 16,
    color: "#5A3E2B",
  },

  button: {
    backgroundColor: "#8B5E3C",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles