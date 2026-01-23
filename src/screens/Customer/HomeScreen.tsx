import React from "react";
import { StyleSheet, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "../../components/HeaderBar";
import { SearchBar } from "react-native-screens";
import PopularSection from "../../components/PopularSection";

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[]} 
        keyExtractor={(item, index) => index.toString()}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <HeaderBar />
            <SearchBar />
            <PopularSection />
          </>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7EF",
    paddingHorizontal: 16,
  },
});
