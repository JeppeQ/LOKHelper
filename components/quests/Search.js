import { Box, ScrollView, Text } from "native-base";
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
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

  useEffect(() => {
    openDatePicker(false)
  }, [selectReward])

  if (searchDate) {
    return <DateSearch date={searchDate} back={() => setSearchDate(false)} />
  }

  if (selectReward) {
    return <RewardSearch back={() => setSelectReward()} />
  }

  return (
    <ScrollView style={styles.container}>

      {Platform.OS !== 'ios' && pickDate && <DateTimePicker
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

      {Platform.OS === 'ios' && pickDate && <Box mt={10} justifyContent='center' flexDir='row' px={12}>

        <Text fontSize={'lg'}>Select date</Text>
        <DateTimePicker
          value={new Date()}
          onChange={setDate}
          themeVariant="dark"
          style={{ width: '80%' }}
        />

      </Box>}

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