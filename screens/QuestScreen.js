import { Box, ScrollView } from "native-base";
import React from 'react';
import { StyleSheet } from "react-native";
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import Quests from '../data/quests.json';
import { APP_ID } from "../helpers/utilities";
import Quest from "../components/quests/Quest";

const adUnitId = __DEV__ ? APP_ID.TEST_BANNER : APP_ID.BANNER;

const QuestScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>

      <Box style={{ marginTop: 10 }}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </Box>

      {React.Children.toArray(
        Quests.sort((a, b) => a.name > b.name ? 1 : -1).map(quest =>
          <Quest
            data={quest}
          />
        )
      )}

    </ScrollView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5
  },
  section: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#222222',
    borderRadius: 8,

    shadowColor: '#000',
    elevation: 5,
  },
  icon: {
    width: 35,
    height: undefined,
    aspectRatio: 1 / 1,
    marginRight: 4,
    marginLeft: -6
  }
})

export default QuestScreen

