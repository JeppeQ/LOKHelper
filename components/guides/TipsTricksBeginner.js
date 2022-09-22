import { Box, Icon, IconButton, ScrollView, Text } from "native-base";
import React from 'react';
import { StyleSheet } from "react-native";
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { APP_ID } from "../../helpers/utilities";

const adUnitId = __DEV__ ? APP_ID.TEST_BANNER : APP_ID.BANNER;

const TipsTricksBeginner = (props) => {
  return (
    <ScrollView style={styles.container}>

      <Box mt={2}>
        <Text fontSize={'2xl'} bold>
          Tips & Tricks for beginners
        </Text>
      </Box>

      <Box mt={2}>
        <Text color='light.400' fontSize={'lg'} letterSpacing={0.5} bold>
          Expand your workforce
        </Text>

        <Text fontSize={'md'} lineHeight={20} mt={1}>
          Once you reach VIP level 5 you'll unlock an additional building queue.
          Twice the builders, twice the speed. This should be your number one priority.
        </Text>
      </Box>

      <Box mt={4}>
        <Text color='light.400' fontSize={'lg'} letterSpacing={0.5} bold>
          No time to rest
        </Text>

        <Text fontSize={'md'} lineHeight={20} mt={1}>
          Time is the biggest constraint in this game. Try to always keep your workers busy (Construction, Researching and Troop training).
          If you know you can't play for the next x hours, prioritize an upgrade that takes that amount of time.
          The same applies for using your troops to gather resources when you're not online.
        </Text>
      </Box>

      <Box mt={4}>
        <Text color='light.400' fontSize={'lg'} letterSpacing={0.5} bold>
          Keep your AP low and spend it wisely
        </Text>

        <Text fontSize={'md'} lineHeight={20} mt={1}>
          Action points replenish slowly over time up to your max capacity.
          If your AP is at max capacity or higher, you'll be losing out on free AP because you will not replenish any.
          Try to always keep your AP below max capacity. Rallying big monsters is the best way to spend AP.
          See if you can join a big alliance that are capable of killing Deathkars/Dragons. Whichever way you spend AP,
          make sure you pick targets that are suitable for your troops. Don't spend your AP needlessly trying to take down a high lvl monsters.
        </Text>
      </Box>

      <Box style={{ marginTop: 15, alignItems: 'center' }}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.LARGE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </Box>

      <Box mt={4}>
        <Text color='light.400' fontSize={'lg'} letterSpacing={0.5} bold>
          Charms are your friends
        </Text>

        <Text fontSize={'md'} lineHeight={20} mt={1}>
          Every time a monster is killed, a charm will be left behind. The first player to pick it up will get a buff.
          You only need to send one troop to pick up a charm and it doesn't cost anything.
          Try to have all the different buffs active at all times.
        </Text>
      </Box>

      <Box mt={4}>
        <Text color='light.400' fontSize={'lg'} letterSpacing={0.5} bold>
          Complete your dailies
        </Text>

        <Text fontSize={'md'} lineHeight={20} mt={1}>
          Don't be lazy! Complete your daily quests for good rewards.
          You won't be able to complete all event quests at the beginning, but do as many as you can.
        </Text>
      </Box>

      <Box mt={4}>
        <Text color='light.400' fontSize={'lg'} letterSpacing={0.5} bold>
          Only fools pay full price
        </Text>

        <Text fontSize={'md'} lineHeight={20} mt={1}>
          Use the Trading Post to get discounted items/resources. The caravan brings new stuff every 4 hours.
          The VIP shop updates weekly and has great discounts. This is where you want to spend your gems.
        </Text>
      </Box>

      <Box mt={4}>
        <Text color='light.400' fontSize={'lg'} letterSpacing={0.5} bold>
          Protect yourself at all times
        </Text>

        <Text fontSize={'md'} lineHeight={20} mt={1}>
          Getting attacked by other players can be devastating. You will lose troops and resources. Try to avoid this at all cost.
          Your base will have a shield until you reach Castle lvl 10. If you engage in any PvP activity before level 10, your shield will break.
          If you join a big alliance that offers protection, other players will be afraid of attacking you.
          Be friendly towards other players to reduce the risk of them attacking you.
        </Text>
      </Box>

      <Box mt={4}>
        <Text color='light.400' fontSize={'lg'} letterSpacing={0.5} bold>
          Patience is key
        </Text>

        <Text fontSize={'md'} lineHeight={20} mt={1}>
          Although it can be tempting to spend all your speedups, gems, ap etc. immediately, this is not an optimal strategy.
          You want to save your items for completing quests, your gems for the Trading Post and your AP for monster rallying.
          Building your base up will take time no matter what, so be patient and enjoy the journey.
        </Text>
      </Box>

      <Box style={{ marginTop: 10, marginBottom: 15 }}>
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
    paddingHorizontal: 10,
    backgroundColor: '#222222'
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
  },
  header: {
    marginTop: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 64,
    height: 64,
    marginTop: 10
  }
})

export default TipsTricksBeginner
