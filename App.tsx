import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/SplashScreen/WelcomeScreen';
import CustomerLoginScreen from './src/screens/LoginScreen/CustomerLoginScreen';
import VendorLoginScreen from './src/screens/LoginScreen/VendorLoginScreen';
import MainTabs from './src/components/tabs/MainTabs';
import FoodDetailsScreen from './src/screens/Customer/FoodDetailsScreen';
import OrderSuccessScreen from './src/screens/Customer/SuccessScreen/Index';
import OrdersScreen from './src/screens/Vendor/OrdersScreen';
import MainTabsVendor from './src/components/vendor/TabItem';
import VendorProductsScreen from './src/components/vendor/VendorProductsScreen';
import VendorAddEditProductScreen from './src/screens/Vendor/VendorAddEditProduct';
import VendorOrderDetailsScreen from './src/screens/Vendor/VendorOrderDetailsScreen';
import VendorProfileScreen from './src/screens/Vendor/VendorProfileScreen';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
       barStyle="dark-content" 
      />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{ headerShown: false }} >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen
            name="CustomerLoginScreen"
            component={CustomerLoginScreen}
          />
          <Stack.Screen
            name="VendorLoginScreen"
            component={VendorLoginScreen}
          />

          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="FoodDetailsScreen" component={FoodDetailsScreen} />
          <Stack.Screen
            name="OrderSuccess"
            component={OrderSuccessScreen}
          />

          <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
          <Stack.Screen name="MainTabsVendor" component={MainTabsVendor} />
          <Stack.Screen
            name="VendorProductsScreen"
            component={VendorProductsScreen}
          />
          <Stack.Screen
            name="VendorAddEditProduct"
            component={VendorAddEditProductScreen}
          />
          <Stack.Screen
            name="VendorOrderDetailsScreen"
            component={VendorOrderDetailsScreen}
          />
          <Stack.Screen
            name="VendorProfileScreen"
            component={VendorProfileScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
