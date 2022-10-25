import { Box, ScrollView, Spinner, Text } from "native-base";
import React, { useContext } from 'react';
import { StyleSheet } from "react-native";
import { QuestContext } from "../../contexts/QuestContext";
import Quest from "./Quest";
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { APP_ID } from "../../helpers/utilities";

const adUnitId = __DEV__ ? APP_ID.TEST_BANNER : APP_ID.BANNER;

const Upcoming = () => {
  const quests = useContext(QuestContext)

  if (!quests.upcoming) {
    return <Spinner mt={10} color='white' size='sm' />
  }

  return (
    <ScrollView style={styles.container}>

      {React.Children.toArray(
        quests.upcoming.map(quest =>
          <Quest
            data={quest}
          />
        )
      )}

      <Box style={{ marginTop: 10 }}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </Box>

    </ScrollView>
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

export default Upcoming
