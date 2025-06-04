import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import PageLoader from "../../components/PageLoader";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading indicator while auth state is being determined
  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
