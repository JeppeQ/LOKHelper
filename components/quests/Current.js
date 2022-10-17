import { Box, Input, ScrollView, Spinner, Text } from "native-base";
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { QuestContext } from "../../contexts/QuestContext";
import { APP_ID } from "../../helpers/utilities";
import Quest from "./Quest";
import SetContinent from "./SetContinent";

const adUnitId = __DEV__ ? APP_ID.TEST_BANNER : APP_ID.BANNER;

const Current = () => {
  const quests = useContext(QuestContext)

  if (!quests.continent) {
    return <SetContinent />
  }

  if (!quests.current && quests.continent) {
    return <Spinner mt={10} color='white' size='sm' />
  }

  return (
    <ScrollView style={styles.container}>

      <Box mt={2} justifyContent={'space-between'} pr={1} flexDir='row'>
        <Text fontSize={'md'} color='gray.200'>
          {`Continent ${quests.continent}`}
        </Text>
        <TouchableOpacity onPress={() => quests.setContinent()}>
          <Text fontSize={'md'} underline color='gray.300'>
            {`Change`}
          </Text>
        </TouchableOpacity>
      </Box>

      {
        React.Children.toArray(
          quests.current.map(quest =>
            <Quest
              data={quest}
            />
          )
        )
      }

      <Box style={{ marginTop: 10 }}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </Box>

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

export default Current
