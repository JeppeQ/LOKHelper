import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import GuideScreen from '../screens/GuideScreen';
import BottomNavigation from './TabNavigation';

const Stack = createStackNavigator();

function HomeStack() {

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1C1A20'
        },
        headerTintColor: '#fff',
        cardStyleInterpolator: forFade,
      }}
    >
      <Stack.Screen
        name="Home"
        component={BottomNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Guide"
        component={GuideScreen}
      />
    </Stack.Navigator>
  );
}

export default HomeStack