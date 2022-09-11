import { DateTime } from "luxon";
import { Box, HStack, Icon, IconButton, Text } from "native-base";
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import Collapsible from "react-native-collapsible";
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { questTimeString, rewardIcon } from "../../helpers/utilities";
import Triangle from "react-native-triangle";
import { QuestContext } from "../../contexts/QuestContext";

const Quest = (props) => {
  const quests = useContext(QuestContext)

  const [isCollapsed, setCollapsed] = useState(true)

  const { startTime, endTime, quest } = props.data
  const currentDate = quests.now.toISODate()

  return (
    <Box style={styles.section}>

      <TouchableWithoutFeedback onPress={() => setCollapsed(!isCollapsed)}>
        <Box flexDir='row' justifyContent={'space-between'} alignItems='center' style={{ paddingHorizontal: 15 }}>
          <Box flexDir='row' alignItems={'center'}>

            <Box ml={3}>
              <Text fontSize={'lg'}>
                {quest.name}
              </Text>

              {startTime <= currentDate && endTime > currentDate && <Text color={'light.400'} lineHeight={18}>
                Ends in: {questTimeString(quests.now, endTime)}
              </Text>}

              {startTime > currentDate && <Text color={'light.400'} lineHeight={18}>
                Starts in: {questTimeString(quests.now, startTime)}
              </Text>}

              {endTime <= currentDate && <Text color={'light.400'} lineHeight={18}>
                Quest has ended
              </Text>}
            </Box>
          </Box>

          <IconButton
            icon={<Icon as={Feather} name={!isCollapsed ? "arrow-up" : "arrow-down"} color='white' size={'lg'} />}
            borderRadius='full'
            onPress={() => setCollapsed(!isCollapsed)}
          />
        </Box>
      </TouchableWithoutFeedback>

      <Collapsible collapsed={isCollapsed}>

        {React.Children.toArray(
          quest.tasks.map(task =>
            <Box>
              <Box flexDir='row' alignItems={'center'} mt={3}>
                <Box style={styles.taskBanner}>
                  <Icon as={FontAwesome5} name={"exclamation"} color='yellow.500' size={'sm'} />
                  <Text fontSize={task.description.length > 60 ? '11' : task.description.length > 50 ? '13' : task.description.length > 40 ? 'sm' : 'md'}>
                    {task.description}
                  </Text>
                </Box>

                <Triangle
                  width={15}
                  height={30}
                  color={'#333333'}
                  direction={'right'}
                />
              </Box>

              <HStack flexDir='row' flexWrap={'wrap'} space={1} style={{ paddingHorizontal: 15, marginTop: 6 }}>
                {React.Children.toArray(
                  task.rewards.map(reward => <Box>
                    <Image source={rewardIcon[reward.type]} alt='icon' style={styles.icon} />
                    <Text style={styles.rewardAmount} fontSize={'md'} bold>{reward.amount}</Text>
                  </Box>
                  )
                )}
              </HStack>
            </Box>
          )
        )}

      </Collapsible>

    </Box>
  )
}

const styles = StyleSheet.create({
  section: {
    marginTop: 10,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#222222',
    borderRadius: 8,

    shadowColor: '#000',
    elevation: 5,
  },
  icon: {
    width: 60,
    height: 60,
    marginTop: 2
  },
  taskBanner: {
    flexDirection: 'row',
    width: '90%',
    paddingLeft: 15,
    height: 30,
    alignItems: 'center',
    backgroundColor: '#333333'
  },
  rewardAmount: {
    position: 'absolute',
    bottom: 1,
    right: 5,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    textShadowColor: '#000',
  }
})

export default Quest
