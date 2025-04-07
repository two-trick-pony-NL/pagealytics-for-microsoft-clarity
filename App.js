import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import APIKeyScreen from './APIKeyScreen';
import DashboardScreen from './DashboardScreen';
import secureStorage from './SecureStore';

const Stack = createStackNavigator();

const App = () => {
  const [isAPIKeyStored, setIsAPIKeyStored] = useState(false);

  useEffect(() => {
    const checkAPIKey = async () => {
      const apiKey = await secureStorage.getAPIKey();
      setIsAPIKeyStored(!!apiKey);
    };

    checkAPIKey();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAPIKeyStored ? '"Clarity Go' : 'APIKey'}>
        <Stack.Screen
          name="APIKey"
          component={APIKeyScreen}
          options={{
            headerShown: false, // This will hide the header
          }}
        />
        <Stack.Screen
          name="Clarity Go"
          component={DashboardScreen}
          options={{
            title: 'PageLytics for Microsoft Clarity', // Set the title of the screen
            headerStyle: { backgroundColor: '#B81365' }, // Customize the header style
            headerTintColor: '#fff', // Customize header text color
            headerTitleStyle: { fontWeight: 'bold' }, // Customize the title text style
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
