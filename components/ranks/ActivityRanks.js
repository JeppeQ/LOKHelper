import { ScrollView, Box, Text, Spinner } from "native-base";
import React from 'react';
import { StyleSheet } from "react-native";
import NumberFormat from 'react-number-format';

const ActivityRanks = (props) => {

  const { loading, continents } = props

  if (loading) {
    return <Spinner mt={10} color='white' size='sm' />
  }

  const divider = String(Math.round(continents[0].activity)).length - 2 

  return (
    <ScrollView style={styles.container}>

      <Box mt={4}>
        <Box style={styles.header}>
          <Box style={{ width: '20%' }}>
            <Text color={'light.400'} fontSize='md'>#</Text>
          </Box>
          <Box style={{ width: '30%' }}>
            <Text color={'light.400'} fontSize='md'>Cont.</Text>
          </Box>
          <Box style={{ width: '30%' }}>
            <Text color={'light.400'} fontSize='md'>Score</Text>
          </Box>
        </Box>

        {React.Children.toArray(
          continents.map((continent, i) =>
            <Box style={styles.row}>
              <Box style={{ width: '20%' }}>
                <Text fontSize='md' color='light.300'>{i + 1}.</Text>
              </Box>
              <Box style={{ width: '30%' }}>
                <Text fontSize='md' bold>{continent.id}</Text>
              </Box>
              <Box style={{ width: '30%' }} flexDir='row' alignItems={'center'}>
                {continent.activity && <NumberFormat
                  value={continent.activity / Math.pow(10, divider)}
                  displayType={'text'}
                  decimalScale={2}
                  thousandSeparator={true}
                  renderText={(value) => <Text fontSize={'md'}>{value}</Text>}
                />}
              </Box>
            </Box>
          )
        )}
      </Box>

      <Box mb={4} />

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5
  },
  header: {
    paddingHorizontal: 15,
    width: '100%',
    height: 40,
    backgroundColor: '#222222',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5
  },
  row: {
    height: 38,
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderBottomColor: 'rgba(255, 255, 255, .2)',
  },
  headerText: {
    color: '#7C8E8E',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
})

export default ActivityRanks
