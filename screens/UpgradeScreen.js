import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Building from '../components/upgrades/Building';
import Research from '../components/upgrades/Research';
import Troop from '../components/upgrades/Troop';

const renderScene = SceneMap({
  research: Research,
  building: Building,
  troop: Troop
});

const UpgradeScreen = ({ navigation }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'research', title: 'Research' },
    { key: 'building', title: 'Building' },
    { key: 'troop', title: 'Troop' }
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: '#222222',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3,
  },
})

export default UpgradeScreen