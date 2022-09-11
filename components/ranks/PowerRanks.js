import { ScrollView, Box, Text, Spinner } from "native-base";
import React from 'react';
import { StyleSheet } from "react-native";
import NumberFormat from 'react-number-format';

const PowerRanks = (props) => {

  const { loading, continents } = props

  if (loading) {
    return <Spinner mt={10} color='white' size='sm' />
  }

  return (
    <ScrollView style={styles.container}>

      <Box mt={4}>
        <Box style={styles.header}>
          <Box style={{ width: '20%' }}>
            <Text color={'light.400'} fontSize='md'>#</Text>
          </Box>
          <Box style={{ width: '20%' }}>
            <Text color={'light.400'} fontSize='md'>Cont.</Text>
          </Box>
          <Box style={{ width: '30%' }}>
            <Text color={'light.400'} fontSize='md'>Alliance</Text>
          </Box>
          <Box style={{ width: '30%' }}>
            <Text color={'light.400'} fontSize='md'>Power</Text>
          </Box>
        </Box>

        {React.Children.toArray(
          continents.map((continent, i) =>
            <Box style={styles.row}>
              <Box style={{ width: '20%' }}>
                <Text fontSize='md' color='light.300'>{i + 1}.</Text>
              </Box>
              <Box style={{ width: '20%' }}>
                <Text fontSize='md' bold>{continent.id}</Text>
              </Box>
              <Box style={{ width: '30%' }} flexDir='row' alignItems={'center'}>
                {continent.allianceTag ? <Text fontSize='md'>[{continent.allianceTag}]</Text> : <Text fontSize={'md'}>TBD</Text>}
              </Box>
              <Box style={{ width: '30%' }} flexDir='row' alignItems={'center'}>
                {continent.power && <NumberFormat
                  value={continent.power / 1000000000}
                  displayType={'text'}
                  decimalScale={2}
                  thousandSeparator={true}
                  suffix={' B'}
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

export default PowerRanks
