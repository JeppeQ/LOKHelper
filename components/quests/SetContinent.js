import React, { useContext, useState } from 'react';
import { Box, Input, Text } from "native-base"
import { QuestContext } from "../../contexts/QuestContext"

const SetContinent = () => {
  const quests = useContext(QuestContext)
  const [con, setCon] = useState('')

  return <Box flex={1} marginTop={5} alignItems={'center'}>
    <Text fontSize={'lg'}>Choose Continent to view quests</Text>
    <Box width='66' mt={2}>
      <Input
        size="lg"
        value={con}
        onChangeText={(text) => setCon(text)}
        onEndEditing={(e) => quests.setContinent(e.nativeEvent.text)}
        keyboardType={'numeric'}
        variant={'outline'}
        isFullWidth={false}
        placeholder={'24'}
        InputLeftElement={
          <Box ml={3}>
            <Text fontSize={'md'} color='gray.400'>C</Text>
          </Box>
        }
      />
    </Box>
  </Box>
}

export default SetContinent