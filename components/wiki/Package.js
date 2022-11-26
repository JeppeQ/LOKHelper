import { Box, HStack, Icon, IconButton, Text } from "native-base";
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Collapsible from "react-native-collapsible";
import Triangle from "react-native-triangle";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { rewardIcon } from "../../helpers/utilities";

const Package = (props) => {
  const [isCollapsed, setCollapsed] = useState(true)

  return (
    <Box style={styles.section}>

      <TouchableWithoutFeedback onPress={() => setCollapsed(!isCollapsed)}>
        <Box flexDir='row' justifyContent={'space-between'} alignItems='center' style={{ paddingHorizontal: 15 }}>
          <Box flexDir='row' alignItems={'center'}>

            <Box ml={3}>
              <Text fontSize={'lg'}>
                {props.data.name}
              </Text>

              <Box flexDir={'row'} alignItems={'center'}>
                <Icon as={FontAwesome5} name={"exclamation"} color='gray.400' size={'xs'} />
                <Text color='gray.400'>{props.data.trigger}</Text>
              </Box>
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

        <HStack flexDir='row' flexWrap={'wrap'} space={1} style={{ paddingHorizontal: 15, marginTop: 6 }}>
          {React.Children.toArray(
            props.data.content.map(reward => <Box>
              <Image source={rewardIcon[reward.type]} alt='icon' style={styles.icon} />
              <Text style={styles.rewardAmount} fontSize={'md'} bold>{reward.amount}</Text>
            </Box>
            )
          )}
        </HStack>

      </Collapsible >

    </Box >
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

export default Package
