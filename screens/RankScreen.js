import { Box, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import CvCRanks from '../components/ranks/CvCRanks';
import * as continentApi from '../api/continent'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import PowerRanks from '../components/ranks/PowerRanks';

const RankScreen = ({ navigation }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [continents, setContinents] = useState([])
  const [loading, setLoading] = useState(true)

  const [routes] = React.useState([
    { key: 'cvc', title: 'CvC' },
    { key: 'power', title: 'Power' }
  ]);

  const FirstRoute = () => (
    <CvCRanks
      loading={loading}
      continents={continents.sort((a, b) => a.rank - b.rank)}
    />
  );

  const SecondRoute = () => (
    <PowerRanks
      loading={loading}
      continents={continents.sort((a, b) => b.power - a.power)}
    />
  );

  const renderScene = SceneMap({
    cvc: FirstRoute,
    power: SecondRoute,
  });

  useEffect(() => {
    async function getCon() {
      const data = await continentApi.getContinents()

      if (data) {
        setContinents(data)
      }

      setLoading(false)
    }

    getCon()
  }, [])

  return <Box style={{ flex: 1 }}>
    <TabView
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
  </Box>
}

export default RankScreen