import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Alert, View } from "react-native";
import { useTransactions } from "../../hooks/useTransactions";
import { useEffect, useState, useMemo, useCallback } from "react";
import PageLoader from "../../components/PageLoader";
import { styles as pageStyles } from "../../assets/styles/home.styles"; // Rename to avoid conflict
import { BalanceCard } from "../../components/BalanceCard";
import HomePageHeader from "../../components/Home/Header";
import TransactionListDisplay from "../../components/Home/TransactionListDisplay";

const UI_CONSTANTS = {
  ADD_ICON_SIZE: 20,
  ADD_ICON_COLOR: "#FFF",
  FALLBACK_USERNAME: "User",
};

const ALERT_STRINGS = {
  DELETE_TITLE: "Delete Transaction",
  DELETE_MESSAGE: "Are you sure you want to delete this transaction?",
  CANCEL_TEXT: "Cancel",
  DELETE_TEXT: "Delete",
};

export default function Page() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);


  const {
    transactions,
    summary,
    isLoading: transactionsIsLoading,
    loadData,
    deleteTransaction,
  } = useTransactions(user?.id);

  const displayName = useMemo(() => {
    const email = user?.emailAddresses?.[0]?.emailAddress;
    if (email && typeof email === "string" && email.includes("@")) {
      return email.split("@")[0];
    }
    return UI_CONSTANTS.FALLBACK_USERNAME;
  }, [user?.emailAddresses]);

  const onRefresh = useCallback(async () => {
    if (user?.id) {
      setRefreshing(true);
      await loadData();
      setRefreshing(false);
    } else {
      setRefreshing(false);
    }
  }, [loadData, user?.id]);

  useEffect(() => {
    if (user?.id) {
      loadData();
    }
  }, [loadData, user?.id]);
  

  const handleDelete = useCallback(
    (transactionId) => {
      Alert.alert(
        ALERT_STRINGS.DELETE_TITLE,
        ALERT_STRINGS.DELETE_MESSAGE,
        [
          { text: ALERT_STRINGS.CANCEL_TEXT, style: "cancel" },
          {
            text: ALERT_STRINGS.DELETE_TEXT,
            style: "destructive",
            onPress: () => deleteTransaction(transactionId),
          },
        ],
        { cancelable: true }
      );
    },
    [deleteTransaction]
  );

  const handleAddPress = useCallback(() => {
    router.push("/create");
  }, [router]);

  if (!isUserLoaded || (transactionsIsLoading && !refreshing)) {
    return <PageLoader />;
  }

  return (
    <View style={pageStyles.container}>
      <View style={pageStyles.content}>
        <HomePageHeader
          userDisplayName={displayName}
          onAddPress={handleAddPress}
        />
        <BalanceCard summary={summary} />
      </View>
      {/* TransactionListDisplay is placed outside pageStyles.content if transactionsList has its own scrolling independent of the top content */}
      {/* If the whole page should scroll together, then TransactionListDisplay would be inside pageStyles.content */}
      <TransactionListDisplay
        transactions={transactions}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onDeleteTransaction={handleDelete}
      />
    </View>
  );
}
