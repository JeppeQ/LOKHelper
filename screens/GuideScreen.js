import React from 'react';
import TipsTricksBeginner from '../components/guides/TipsTricksBeginner';

const GuideScreen = ({ route, navigation }) => {
  if (route.params.guide === 1) {
    return <TipsTricksBeginner />
  }
}

export default GuideScreen