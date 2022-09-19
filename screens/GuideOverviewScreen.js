import { Box, Text } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const GuideOverviewScreen = ({ navigation }) => {

  const openGuide = (guide) => {
    navigation.navigate("Guide", {
      guide
    })
  }

  return <Box style={{ flex: 1, alignItems: 'center' }}>

    <TouchableOpacity style={styles.section} onPress={() => openGuide(1)}>
      <Box>
        <Text fontSize={'lg'} color='light.400' bold>
          BEGINNER GUIDE
        </Text>
      </Box>

      <Box>
        <Text fontSize={'3xl'} color='#E1E1E1' bold>
          TIPS & TRICKS
        </Text>
      </Box>
    </TouchableOpacity>

    <Box width={'80%'} style={{ position: 'absolute', bottom: '10%' }}>
      <Text italic fontSize={'md'} textAlign={'center'} mt={4}>
        If you would like to contribute a guide, please reach out to lokhelper@gmail.com
      </Text>
    </Box>
  </Box>
}

const styles = StyleSheet.create({
  section: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: '95%',
    backgroundColor: '#1E1E1E',
    borderRadius: 5,

    shadowColor: '#000',
    elevation: 5,
  }
})

export default GuideOverviewScreen