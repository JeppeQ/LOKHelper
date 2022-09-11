import { Box, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import CvCRanks from '../components/ranks/CvCRanks';
import * as continentApi from '../api/continent'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import PowerRanks from '../components/ranks/PowerRanks';

const GuideScreen = ({ navigation }) => {
  return <Box style={{ flex: 1 }}>

    <Box alignItems={'center'} width='100%' mt={10} px={8}>
      <Text italic fontSize={'lg'}>
        Guides are coming soon
      </Text>

      <Text italic fontSize={'md'} textAlign={'center'} mt={4}>
        If you would like to contribute a guide, please reach out to lokhelper@gmail.com
      </Text>
    </Box>

  </Box>
}

export default GuideScreen