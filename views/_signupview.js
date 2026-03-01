import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { supabase } from "../config/supabaseConfig";
import styles from "../styles/_signupStyle";

export default function SignUpView() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Missing Fields", "All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Error", "Passwords do not match.");
      return;
    }

    // 1. Create account in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (error) {
      Alert.alert("Signup Error", error.message);
      return;
    }

    const user = data.user;

    // 2. Insert into our own users table
    const { error: insertError } = await supabase.from("users").insert([
      {
        auth_id: user.id,
        name: name,
        email: email
      }
    ]);

    if (insertError) {
      Alert.alert("Database Error", insertError.message);
      return;
    }

    Alert.alert(
      "Success",
      "Account created! Please confirm your email."
    );

    router.replace("/"); // go back to landing page
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#8E6E4E"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#8E6E4E"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#8E6E4E"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        autoComplete="off"
        textContentType="oneTimeCode"
        importantForAutofill="no"
        autoCorrect={false}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#8E6E4E"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        autoComplete="off"
        textContentType="oneTimeCode"
        importantForAutofill="no"
        autoCorrect={false}
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>
        By creating an account you can access bookmarks, audio reading, and thought sharing.
      </Text>

    </View>
  );
}
