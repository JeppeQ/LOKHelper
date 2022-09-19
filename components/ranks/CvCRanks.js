import { ScrollView, Box, Text, Spinner } from "native-base";
import React from 'react';
import { StyleSheet } from "react-native";
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { APP_ID } from "../../helpers/utilities";

const adUnitId = __DEV__ ? APP_ID.TEST_BANNER : APP_ID.PROD;

const _LEAGUES = [
  {
    name: "Major 1: Emperor's League",
    color: 'red.600'
  },
  {
    name: "Major 2: King's League",
    color: 'purple.600'
  },
  {
    name: "Major 3: Premier League",
    color: 'green.700'
  },
  {
    name: "Rookie League",
    color: 'green.300'
  },
  {
    name: "Minor League 1",
    color: 'blue.400'
  },
  {
    name: "Minor League 2",
    color: 'blue.400'
  },
  {
    name: "Minor League 3",
    color: 'blue.400'
  },
  {
    name: "Minor League 4",
    color: 'blue.400'
  },
  {
    name: "Minor League 5",
    color: 'blue.400'
  },
  {
    name: "Minor League 6",
    color: 'blue.400'
  }
]

const CvCRanks = (props) => {

  const { loading, continents } = props

  if (loading) {
    return <Spinner mt={10} color='white' size='sm' />
  }

  const renderLeague = (league, continents) => {
    return <Box key={league.name}>
      <Box alignItems={'center'} mt={3}>
        <Text fontSize={'lg'} bold>
          {league.name}
        </Text>
      </Box>

      <Box style={{ borderWidth: 1 }} borderColor={league.color} mt={1}>
        <Box style={styles.header}>
          <Box style={{ width: '15%' }}>
            <Text color={'light.400'} fontSize='md'>#</Text>
          </Box>
          <Box style={{ width: '20%' }}>
            <Text color={'light.400'} fontSize='md'>Cont.</Text>
          </Box>
          <Box style={{ width: '65%' }}>
            <Text color={'light.400'} fontSize='md'>Leader</Text>
          </Box>
        </Box>

        {React.Children.toArray(
          continents.map(continent =>
            <Box style={styles.row} borderBottomWidth={continent.rank % 8 === 0 ? 0 : 1}>
              <Box style={{ width: '15%' }}>
                <Text fontSize='md' color='light.300'>{continent.rank}.</Text>
              </Box>
              <Box style={{ width: '20%' }}>
                <Text fontSize='md' bold>{continent.id}</Text>
              </Box>
              <Box style={{ width: '65%' }} flexDir='row' alignItems={'center'}>
                {continent.allianceTag && <Text fontSize='sm' mr={0.5}>[{continent.allianceTag}]</Text>}
                <Text fontSize='md'>{continent.allianceName}</Text>
              </Box>
            </Box>
          )
        )}
      </Box>

      {league.name === "Major 2: King's League" &&
        <Box style={{ marginTop: 15, alignItems: 'center' }}>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.LARGE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </Box>
      }
    </Box>
  }

  const leagues = []
  for (let i = 0; i < continents.length; i += 8) {
    leagues.push(
      renderLeague(_LEAGUES[i / 8], continents.slice(i, i + 8))
    )
  }

  return (
    <ScrollView style={styles.container}>

      {leagues}

      <Box mb={4} />

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5
  },
  header: {
    paddingHorizontal: 15,
    width: '100%',
    height: 40,
    backgroundColor: '#222222',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5
  },
  row: {
    height: 38,
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderBottomColor: 'rgba(255, 255, 255, .2)',
  },
  headerText: {
    color: '#7C8E8E',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
})

export default CvCRanks
