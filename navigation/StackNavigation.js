import { createStackNavigator } from '@react-navigation/stack';
import { Icon, IconButton } from 'native-base';
import React from 'react';
import GuideScreen from '../screens/GuideScreen';
import BottomNavigation from './TabNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewsScreen from '../screens/NewsScreen';

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
      screenOptions={({ navigation }) => ({
        safeAreaInsets: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        headerTitle: 'LOK FAN APP',
        headerStyle: {
          backgroundColor: '#1F1B24',
          height: 45
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontStyle: 'italic',
          fontSize: 16
        },
        headerRight: () => <IconButton
          onPress={() => navigation.navigate('News')}
          icon={<Icon as={Ionicons} name={"newspaper-outline"} color='amber.300' />}
        />,
        cardStyleInterpolator: forFade,
      })}
    >
      <Stack.Screen
        name="Home"
        component={BottomNavigation}
      />

      <Stack.Screen
        name="Guide"
        component={GuideScreen}
      />

      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={{
          headerTitle: 'News',
          headerTitleStyle: {
            fontStyle: 'normal'
          },
          headerRight: null
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack