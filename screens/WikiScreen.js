import { Box, Text } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WikiScreen = ({ navigation }) => {

  return <Box style={{ flex: 1, alignItems: 'center' }}>

    <TouchableOpacity style={styles.section} onPress={() => navigation.navigate("Event Quests")}>
      <FontAwesome name="book" color={'violet'} size={32} />
      <Box ml={4}>
        <Text fontSize={'2xl'} color='#E1E1E1' bold>
          EVENT QUESTS
        </Text>
      </Box>
    </TouchableOpacity>

    <TouchableOpacity style={styles.section} onPress={() => navigation.navigate("Packages")}>
      <MaterialCommunityIcons name="treasure-chest" color={'gold'} size={32} />
      <Box ml={4}>
        <Text fontSize={'2xl'} color='#E1E1E1' bold>
          PACKAGES (100$)
        </Text>
      </Box>
    </TouchableOpacity>

  </Box>
}

const styles = StyleSheet.create({
  section: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 16,
    width: '95%',
    backgroundColor: '#1E1E1E',
    borderRadius: 5,

    shadowColor: '#000',
    elevation: 5,
  }
})

export default WikiScreen