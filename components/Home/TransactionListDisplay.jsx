import { FlatList, RefreshControl, Text, View } from "react-native";
import { styles as pageStyles } from "../../assets/styles/home.styles"; // Rename to avoid conflict
import { TransactionItem } from "../../components/TransactionItem";
import NoTransactionsFound from "../../components/NoTransactionsFound";

const TransactionListDisplay = ({
  transactions,
  refreshing,
  onRefresh,
  onDeleteTransaction,
}) => {
  return (
    <>
      <View style={pageStyles.transactionsHeaderContainer}>
        <Text style={pageStyles.sectionTitle}>Recent Transactions</Text>
      </View>
      <FlatList
        style={pageStyles.transactionsList}
        contentContainerStyle={pageStyles.transactionsListContent}
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={onDeleteTransaction} />
        )}
        ListEmptyComponent={<NoTransactionsFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9Bd35A", "#689F38"]}
            tintColor={"#689F38"}
          />
        }
      />
    </>
  );
};

export default TransactionListDisplay;
