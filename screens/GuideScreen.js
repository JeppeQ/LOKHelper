import React, { useContext, useEffect } from 'react';
import TipsTricksBeginner from '../components/guides/TipsTricksBeginner';
import { NavigationContext } from '../contexts/NavigationContext';

const GuideScreen = ({ route, navigation }) => {
  const nav = useContext(NavigationContext)

  useEffect(() => {
    nav.setBack(true)
  }, [])

  useEffect(() => {
    if (nav.goBack) {
      nav.reset()
      navigation.navigate('Home')
    }
  }, [nav.goBack])

  if (route.params.guide === 1) {
    return <TipsTricksBeginner />
  }
}

export default GuideScreen