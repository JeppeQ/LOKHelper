import { Box, Icon, IconButton, ScrollView, Spinner, Text } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import * as questApi from '../../api/quest';
import Quest from "./Quest";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DateTime } from "luxon";

const DateSearch = (props) => {
  const [quests, setQuests] = useState()

  console.log(props.date)

  useEffect(() => {
    async function getQuests() {
      const data = await questApi.getQuestsByDate(props.date)

      if (data) {
        setQuests(data)
      }
    }

    getQuests()
  }, [props.date])

  if (!quests) {
    return <Spinner mt={10} color='white' size='sm' />
  }

  return (
    <ScrollView style={styles.container}>

      <Box style={styles.header}>
        <IconButton
          icon={<Icon as={AntDesign} name="arrowleft" size={'7'} color='white' />}
          onPress={props.back}
        />

        <Text marginLeft={3} fontSize='lg'>{props.date.toString().slice(0, 15)}</Text>
      </Box>

      {React.Children.toArray(
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
})

export default DateSearch
