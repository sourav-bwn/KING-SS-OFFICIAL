import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import AccountGenerationSetupScreen from './src/screens/AccountGenerationSetupScreen';
import GenerationDashboardScreen from './src/screens/GenerationDashboardScreen';
import AccountDetailsScreen from './src/screens/AccountDetailsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ManageMobileNumbersScreen from './src/screens/ManageMobileNumbersScreen';
import JarvisProblemLogScreen from './src/screens/JarvisProblemLogScreen';
import TargetAccountAutomationScreen from './src/screens/TargetAccountAutomationScreen';
import EdgeLightingScreen from './src/screens/EdgeLightingScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerStyle: { backgroundColor: '#1e1e1e' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            cardStyle: { backgroundColor: '#121212' }
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Setup" component={AccountGenerationSetupScreen} options={{ title: 'Setup' }} />
          <Stack.Screen name="Dashboard" component={GenerationDashboardScreen} options={{
            title: 'Dashboard',
            headerRight: () => null // Could add settings icon here
          }} />
          <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} options={{ title: 'Account Details' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
          <Stack.Screen name="ManageMobile" component={ManageMobileNumbersScreen} options={{ title: 'Manage Numbers' }} />
          <Stack.Screen name="JarvisLog" component={JarvisProblemLogScreen} options={{ title: 'Jarvis Log' }} />
          <Stack.Screen name="TargetAutomation" component={TargetAccountAutomationScreen} options={{ title: 'Target Automation' }} />
          <Stack.Screen name="EdgeLightingPreview" component={EdgeLightingScreen} options={{ title: 'Edge Lighting' }} />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
