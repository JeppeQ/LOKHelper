import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Foundation from 'react-native-vector-icons/Foundation'

import HomeScreen from '../screens/QuestScreen'
import UpgradeScreen from '../screens/UpgradeScreen';
import RankScreen from '../screens/RankScreen';
import GuideScreen from '../screens/GuideScreen';

const Tab = createMaterialBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Quests"
    >
      <Tab.Screen
        name="Quests"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Quests',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" color={color} size={24} />
          ),
        }}
      />

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
          tabBarLabel: 'Ranking',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='podium' color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="Guides"
        component={GuideScreen}
        options={{
          tabBarLabel: 'Guides',
          tabBarIcon: ({ color }) => (
            <Foundation name='guide-dog' color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation