import { Box, ScrollView, Text } from "native-base";
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DateSearch from "./DateSearch";
import RewardSearch from "./RewardSearch";

const Search = () => {
  const [pickDate, openDatePicker] = useState(false)
  const [searchDate, setSearchDate] = useState()
  const [selectReward, setSelectReward] = useState()

  const setDate = (event, date) => {
    if (event.type === "set") {
      setSearchDate(date)
    }

    openDatePicker(false)
  }

  if (searchDate) {
    return <DateSearch date={searchDate} back={() => setSearchDate(false)} />
  }

  if (selectReward) {
    return <RewardSearch back={() => setSelectReward()} />
  }

  return (
    <ScrollView style={styles.container}>

      {pickDate && <DateTimePicker
        value={new Date()}
        onChange={setDate}
        themeVariant="dark"
      />}

      <Box flexDir={'row'} justifyContent={'space-evenly'}>
        <TouchableOpacity style={styles.section} onPress={() => openDatePicker(true)}>
          <Text fontSize={'lg'} bold>
            Search day
          </Text>

          <FontAwesome name="calendar" color={'white'} size={42} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.section} onPress={() => setSelectReward(true)}>
          <Text fontSize={'lg'} bold>
            Search reward
          </Text>

          <MaterialCommunityIcons name='treasure-chest' color={'white'} size={42} />
        </TouchableOpacity>
      </Box>

    </ScrollView >
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  section: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '40%',
    height: 150,
    backgroundColor: '#222222',
    borderRadius: 8,
    justifyContent: 'space-evenly',
    alignItems: 'center',

    shadowColor: '#000',
    elevation: 5,
  },
})