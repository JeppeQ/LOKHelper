import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Current from '../components/quests/Current';
import Search from '../components/quests/Search';
import Upcoming from '../components/quests/Upcoming';

const renderScene = SceneMap({
  current: Current,
  upcoming: Upcoming,
  search: Search
});

const QuestScreen = ({ navigation }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'current', title: 'Current' },
    { key: 'upcoming', title: 'Upcoming' },
    { key: 'search', title: 'Search' }
  ]);

  return <TabView
    renderTabBar={props => <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#373737' }}
    />}
    navigationState={{ index, routes }}
    renderScene={renderScene}
    onIndexChange={setIndex}
    initialLayout={{ width: layout.width }}
  />
}

export default QuestScreen