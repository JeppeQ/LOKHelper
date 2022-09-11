import { Box, HStack, Icon, IconButton, Image, ScrollView, Spinner, Text } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import * as questApi from '../../api/quest';
import Quest from "./Quest";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DateTime } from "luxon";
import { rewardIcon, searchableRewards } from "../../helpers/utilities";

const RewardSearch = (props) => {
  const [quests, setQuests] = useState()
  const [reward, setReward] = useState()

  const back = () => {
    if (reward) {
      setReward()
      setQuests()
    } else {
      props.back()
    }
  }

  useEffect(() => {
    if (!reward) { return }

    async function getQuests() {
      const data = await questApi.getQuestsByReward(reward)

      if (data) {
        setQuests(data)
      }
    }

    getQuests()
  }, [reward])

  if (reward && !quests) {
    return <Spinner mt={10} color='white' size='sm' />
  }

  return (
    <ScrollView style={styles.container}>

      <Box style={styles.header}>
        <IconButton
          icon={<Icon as={AntDesign} name="arrowleft" size={'7'} color='white' />}
          onPress={back}
        />

        <Text marginLeft={3} fontSize='lg'>
          {reward ? searchableRewards[reward] : 'Select reward'}
        </Text>
      </Box>

      <HStack flexDir='row' flexWrap={'wrap'} space={2} style={{ marginTop: 5, paddingLeft: 12 }}>
        {!reward && React.Children.toArray(
          Object.keys(searchableRewards).map(x =>
            <TouchableOpacity onPress={() => setReward(x)}>
              <Image source={rewardIcon[x]} alt='icon' style={styles.icon} />
            </TouchableOpacity>
          )
        )}
      </HStack>

      {reward && React.Children.toArray(
        quests.map(quest =>
          <Quest
            data={quest}
            upcoming={true}
          />
        )
      )}
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

export default RewardSearch
