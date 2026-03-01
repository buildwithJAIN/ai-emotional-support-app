import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0",
    paddingHorizontal: 25,
    paddingTop: 90,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#5A3E2B",
    marginBottom: 35,
    alignSelf: "center",
  },

  input: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#D8C4A3",
    fontSize: 16,
    color: "#5A3E2B",
  },

  button: {
    backgroundColor: "#8B5E3C",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 10,
    alignItems: "center",
    elevation: 3,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  infoText: {
    marginTop: 25,
    color: "#A07C5A",
    fontSize: 13,
    textAlign: "center",
    width: "90%",
    alignSelf: "center",
  },
});
export default styles