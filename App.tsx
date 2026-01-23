import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomerLoginScreen from './src/screens/LoginScreen/CustomerLoginScreen';
import VendorLoginScreen from './src/screens/LoginScreen/VendorLoginScreen';
import MainTabs from './src/components/tabs/MainTabs';
import WelcomeScreen from './src/screens/Customer/SplashScreen';
import FoodDetailsScreen from './src/screens/Customer/FoodDetailsScreen';
import OrderSuccessScreen from './src/screens/Customer/SuccessScreen/Index';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="WelcomeScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen
            name="CustomerLoginScreen"
            component={CustomerLoginScreen}
          />
          <Stack.Screen
            name="VendorLoginScreen"
            component={VendorLoginScreen}
          />
          <Stack.Screen name="FoodDetailsScreen" component={FoodDetailsScreen} />  
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen
  name="OrderSuccess"
  component={OrderSuccessScreen}
  options={{ headerShown: false }}
/>

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
