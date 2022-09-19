import React, { useContext, useEffect, useState } from 'react'
import { Box, Center, CheckIcon, Divider, HStack, Icon, IconButton, Image, Input, ScrollView, Select, Text, VStack } from "native-base"
import { StyleSheet, View, useWindowDimensions, TouchableWithoutFeedback } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import NumberFormat from 'react-number-format';
import Feather from 'react-native-vector-icons/Feather'
import Buildings from '../../data/buildings'
import * as utility from '../../helpers/utilities';
import { UpgradeContext } from '../../contexts/UpgradeContext';
import HelpSettings from './HelpSettings';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { APP_ID } from "../../helpers/utilities";

const adUnitId = __DEV__ ? APP_ID.TEST_BANNER : APP_ID.PROD;

const Building = () => {
  const upgrade = useContext(UpgradeContext)

  const [level, setLevel] = useState()
  const [building, setBuilding] = useState("");
  const [reduction, openReduction] = useState(false)
  const [reducedSeconds, setReducedSeconds] = useState(0)
  const [helpSeconds, setHelpSeconds] = useState(0)

  useEffect(() => {
    if (!level || !building) return;

    const reducedSecs = Math.ceil(Buildings[building][level].time / (1 + (upgrade.values.construction / 100)))

    setReducedSeconds(reducedSecs)
    setHelpSeconds(utility.calcHelpTime(reducedSecs, utility.helps(upgrade.values.hoa), upgrade.values.help1, upgrade.values.help2))

  }, [level, building, upgrade.values])

  let levels = []
  for (let i = 30; i >= 0; i--) {
    levels.push(<Select.Item label={String(i)} value={String(i)} />)
  }

  return (
    <ScrollView style={styles.container}>

      <Box style={styles.section} py={1}>
        <TouchableWithoutFeedback onPress={() => openReduction(!reduction)}>
          <Box flexDir='row' justifyContent={'space-between'} alignItems='center'>
            <Text fontSize={'md'}>
              Set Reduction
            </Text>

            <IconButton
              icon={<Icon as={Feather} name={reduction ? "arrow-up" : "arrow-down"} color='white' size={'lg'} />}
              borderRadius='full'
              onPress={() => openReduction(!reduction)}
            />
          </Box>
        </TouchableWithoutFeedback>

        {reduction && <Box>
          <Box flexDir='row' justifyContent={'space-between'} alignItems={'center'} mt={2}>
            <Text fontSize={'md'}>
              Construction Speed
            </Text>

            <Box width='100' height={10}>
              <Input
                size="md"
                value={upgrade.values.construction}
                onChangeText={(text) => upgrade.updateValue('construction', text)}
                keyboardType={'numeric'}
                variant={'outline'}
                isFullWidth={false}
                InputRightElement={
                  <Box mr={3}>
                    <Text fontSize={'md'} bold>%</Text>
                  </Box>
                }
              />
            </Box>
          </Box>

          <HelpSettings />
        </Box>}

      </Box>

      <Box style={styles.section}>
        <Box mb={2}>
          <Text fontSize={'md'}>
            Building
          </Text>

          <HStack width={'100%'} alignItems={'flex-end'}>

            <Box width='70%' mr={'2%'}>
              <Select size='md' selectedValue={building} accessibilityLabel="Select Building" placeholder="Select Building" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }} mt={1} onValueChange={itemValue => setBuilding(itemValue)}>
                {React.Children.toArray(
                  Object.keys(Buildings).map(_building => <Select.Item label={utility.mapName(_building)} value={_building} />)
                )}
              </Select>
            </Box>

            <Box width='28%'>
              <Select size='md' selectedValue={level} accessibilityLabel="1-30" placeholder="Lv." _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }} mt={1} onValueChange={itemValue => setLevel(itemValue)}>
                {React.Children.toArray(levels.slice(0, -1))}
              </Select>
            </Box>

          </HStack>
        </Box>

      </Box >

      {(!building || !level) && <Box mt={4}>
        <Text italic textAlign={'center'} fontSize='md' color='light.300'>
          Select building and level
        </Text>
      </Box>}

      {Boolean(building) && Boolean(level) &&
        <>
          {Buildings[building][level].requirements.length > 0 && <Box style={[styles.section, { backgroundColor: '#1F1B24' }]}>
            <Text fontSize={'md'} color='light.400'>
              Requirements
            </Text>

            <Box mt={1}>
              {Buildings[building][level].requirements.map(req => (
                <Box key={req.type} flexDir='row' justifyContent={'space-between'} alignItems='center'>
                  <Text fontSize={'md'}>{utility.mapName(req.type)}</Text>
                  <Text fontSize={'md'}>{req.level}</Text>
                </Box>)
              )}
            </Box>
          </Box>}

          <Box style={[styles.section, { backgroundColor: '#1F1B24' }]}>
            <Text fontSize={'md'} color='light.400'>
              Cost
            </Text>

            <Box mt={1}>
              {Buildings[building][level].resources.map(res => (
                <Box key={res.type} flexDir='row' justifyContent={'space-between'} alignItems='center'>
                  <Box flexDir='row' alignItems='center'>
                    <Image source={utility.icons[res.type]} alt='icon' style={styles.icon} />
                    <Text fontSize={'md'}>{utility.mapName(res.type)}</Text>
                  </Box>
                  <NumberFormat value={res.value} displayType={'text'} thousandSeparator={true} renderText={(value) => <Text fontSize={'md'}>{value}</Text>} />
                </Box>)
              )}
            </Box>
          </Box>

          <Box style={{ marginTop: 10 }}>
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.FULL_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </Box>

          <Box style={[styles.section, { backgroundColor: '#1F1B24' }]} mb={8}>
            <Text fontSize={'md'} color='light.400'>
              Time
            </Text>

            <Box mt={1}>

              <Box flexDir='row' justifyContent={'space-between'} alignItems='center'>
                <Text fontSize={'md'}>
                  Base time
                </Text>
                <Text fontSize={'md'}>
                  {utility.timeString(Buildings[building][level].time)}
                </Text>
              </Box>

              <Box flexDir='row' justifyContent={'space-between'} alignItems='center' mt={1}>
                <Text fontSize={'md'}>
                  Reduced time ({upgrade.values.construction}%)
                </Text>
                <Text fontSize={'md'}>
                  {utility.timeString(reducedSeconds)}
                </Text>
              </Box>

              <Box flexDir='row' justifyContent={'space-between'} alignItems='center' mt={1}>
                <Text fontSize={'md'}>
                  Help time ({utility.helps(upgrade.values.hoa)} helps)
                </Text>
                <Text fontSize={'md'}>
                  {utility.timeString(helpSeconds)}
                </Text>
              </Box>

              <Divider mt={2} mb={1} bgColor='white' />

              <Box flexDir='row' justifyContent={'space-between'} alignItems='center'>
                <Text fontSize={'md'} bold>
                  Total
                </Text>
                <Text fontSize={'md'} bold>
                  {utility.timeString(reducedSeconds - helpSeconds)}
                </Text>
              </Box>

            </Box>


          </Box>
        </>
      }

    </ScrollView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
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
  }
})

export default Building