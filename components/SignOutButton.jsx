import { useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Alert, Text, TouchableOpacity } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: signOut,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
      <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
    </TouchableOpacity>
  );
};
