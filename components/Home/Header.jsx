import { Text, TouchableOpacity, View } from "react-native";
import { styles as pageStyles } from "../../assets/styles/home.styles"; // Rename to avoid conflict
import { SignOutButton } from "@/components/SignOutButton";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const UI_CONSTANTS = {
  ADD_ICON_SIZE: 20,
  ADD_ICON_COLOR: "#FFF",
  FALLBACK_USERNAME: "User",
};

const HomePageHeader = ({ userDisplayName, onAddPress }) => {
  // It's good practice to define styles specific to the component or reuse from a central style sheet
  // For brevity here, assuming pageStyles contains all necessary styles.
  // If styles were more complex or unique, define them here or import a dedicated style sheet.
  return (
    <View style={pageStyles.header}>
      <View style={pageStyles.headerLeft}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={pageStyles.headerLogo}
          contentFit="contain"
        />
        <View style={pageStyles.welcomeContainer}>
          <Text style={pageStyles.welcomeText}>Welcome,</Text>
          <Text
            style={pageStyles.usernameText}
            numberOfLines={1}
            ellipseMode="tail">
            {userDisplayName}
          </Text>
        </View>
      </View>
      <View style={pageStyles.headerRight}>
        <TouchableOpacity
          style={pageStyles.addButton}
          onPress={onAddPress}
          activeOpacity={0.7}>
          <Ionicons
            name="add"
            size={UI_CONSTANTS.ADD_ICON_SIZE}
            color={UI_CONSTANTS.ADD_ICON_COLOR}
          />
          <Text style={pageStyles.addButtonText}>Add</Text>
        </TouchableOpacity>
        <SignOutButton />
      </View>
    </View>
  );
};

export default HomePageHeader;
