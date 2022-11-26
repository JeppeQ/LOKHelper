import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import GuideOverviewScreen from '../screens/GuideOverviewScreen';
import RankScreen from '../screens/RankScreen';
import UpgradeScreen from '../screens/UpgradeScreen';
import WikiScreen from '../screens/WikiScreen';

const Tab = createMaterialBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Upgrades"
      shifting={false}
    >

      <Tab.Screen
        name="Upgrades"
        component={UpgradeScreen}
        options={{
          tabBarLabel: 'Upgrades',
          tabBarIcon: ({ color }) => (
            <Entypo name='tools' color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Ranks"
        component={RankScreen}
        options={{
          tabBarLabel: 'Ranks',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='podium' color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Tips"
        component={GuideOverviewScreen}
        options={{
          tabBarLabel: 'Tips',
          tabBarIcon: ({ color }) => (
            <Foundation name='lightbulb' color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Wiki"
        component={WikiScreen}
        options={{
          tabBarLabel: 'Wiki',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation