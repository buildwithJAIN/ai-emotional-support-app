import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../../config/supabaseConfig";
import styles from "../styles/_profileStyle";

export default function ProfileView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Change Name
  const handleNameChange = async () => {
    const userId = await supabase.auth.getUser();

    if (!name) return Alert.alert("Error", "Please enter a name.");

    const { error } = await supabase
      .from("users")
      .update({ name })
      .eq("auth_user_id", userId.data.user.id);

    if (error) return Alert.alert("Error", error.message);

    await AsyncStorage.setItem("name", name);
    Alert.alert("Success", "Name updated!");
  };

  // Change Email
  const handleEmailChange = async () => {
    if (!email) return Alert.alert("Error", "Please enter an email.");

    const { error } = await supabase.auth.updateUser({ email });

    if (error) return Alert.alert("Error", error.message);

    await AsyncStorage.setItem("email", email);
    Alert.alert("Success", "Email updated!");
  };

  // Change Password
  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return Alert.alert("Error", "Enter all fields.");
    }

    if (newPassword !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match.");
    }

    // verify old password
    const userData = await AsyncStorage.getItem("email");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userData,
      password: oldPassword,
    });

    if (signInError) {
      return Alert.alert("Error", "Old password is incorrect.");
    }

    // update new password
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) return Alert.alert("Error", error.message);

    Alert.alert("Success", "Password changed!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Management</Text>

      {/* Change Name */}
      <Text style={styles.label}>Change Name</Text>
      <TextInput
        placeholder="Enter new name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.button} onPress={handleNameChange}>
        <Text style={styles.buttonText}>Update Name</Text>
      </TouchableOpacity>

      {/* Change Email */}
      <Text style={styles.label}>Change Email</Text>
      <TextInput
        placeholder="Enter new email"
        style={styles.input}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleEmailChange}>
        <Text style={styles.buttonText}>Update Email</Text>
      </TouchableOpacity>

      {/* Change Password */}
      <Text style={styles.label}>Change Password</Text>

      <TextInput
        placeholder="Old Password"
        style={styles.input}
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
      />

      <TextInput
        placeholder="New Password"
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
}
