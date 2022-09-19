import { Box, CheckIcon, HStack, Icon, IconButton, Image, Input, ScrollView, Select, Text } from "native-base";
import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import NumberFormat from "react-number-format";
import { UpgradeContext } from '../../contexts/UpgradeContext';
import Troops from '../../data/units.json'
import * as utility from '../../helpers/utilities';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { APP_ID } from "../../helpers/utilities";

const adUnitId = __DEV__ ? APP_ID.TEST_BANNER : APP_ID.PROD;

const typeValues = {
  cavalry: {
    speed: 'cavSpeed',
    cost: 'cavCost'
  },
  archer: {
    speed: 'archSpeed',
    cost: 'archCost'
  },
  infantry: {
    speed: 'infSpeed',
    cost: 'infCost'
  }
}

const Troop = () => {
  const upgrade = useContext(UpgradeContext)

  const [reduction, openReduction] = useState(false)
  const [troop, setTroop] = useState("")
  const [tier, setTier] = useState("")
  const [amount, setAmount] = useState("")

  function renderReductionInput(label, value, negative) {
    return <Box flexDir='row' justifyContent={'space-between'} alignItems={'center'} mt={2}>
      <Text fontSize={'md'}>
        {label}
      </Text>

      <Box flexDir='row' alignItems={'center'}>
        {negative && <Text fontSize="lg" mr={1}>-</Text>}
        <Box width='95' height={10}>
          <Input
            size="md"
            value={upgrade.values[value]}
            onChangeText={(text) => upgrade.updateValue(value, text)}
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
    </Box>
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
          {renderReductionInput('Troop Training Speed', 'troopSpeed')}
          {renderReductionInput('Troop Training Cost', 'troopCost', true)}

          {renderReductionInput('Infantry Training Speed', 'infSpeed')}
          {renderReductionInput('Infantry Training Cost', 'infCost', true)}

          {renderReductionInput('Archer Training Speed', 'archSpeed')}
          {renderReductionInput('Archer Training Cost', 'archCost', true)}

          {renderReductionInput('Cavalry Training Speed', 'cavSpeed')}
          {renderReductionInput('Cavalry Training Cost', 'cavCost', true)}

        </Box>}

      </Box>

      <Box style={styles.section}>
        <Box mb={2}>
          <Text fontSize={'md'}>
            Troops
          </Text>

          <HStack width={'100%'} alignItems={'flex-end'} mt={1}>
            <Box width='65%' mr={'2%'}>
              <Select size='md' selectedValue={troop} accessibilityLabel="Select Type" placeholder="Select Type" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }} mt={1} onValueChange={itemValue => setTroop(itemValue)}>
                {React.Children.toArray(
                  Object.keys(Troops).map(troop => <Select.Item label={utility.mapName(troop)} value={troop} />)
                )}
              </Select>
            </Box>

            <Box width='33%'>
              <Select size='md' selectedValue={tier} accessibilityLabel="T1-5" placeholder="T1-T5" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }} mt={1} onValueChange={itemValue => setTier(itemValue)}>
                <Select.Item label={'T1'} value={'1'} />
                <Select.Item label={'T2'} value={'2'} />
                <Select.Item label={'T3'} value={'3'} />
                <Select.Item label={'T4'} value={'4'} />
                <Select.Item label={'T5'} value={'5'} />
              </Select>
            </Box>
          </HStack>

          <Box width='100%' mt={2}>
            <Input
              size="md"
              placeholder="Choose amount"
              value={amount}
              onChangeText={(text) => setAmount(text)}
              keyboardType={'numeric'}
              variant={'outline'}
              isFullWidth={false}
            />
          </Box>
        </Box>
      </Box >

      {Boolean(troop) && Boolean(tier) && Boolean(amount) &&
        <>
          <Box style={[styles.section, { backgroundColor: '#1F1B24' }]}>
            <Text fontSize={'md'} color='light.400'>
              Cost
            </Text>

            <Box mt={1}>
              {Troops[troop].find(x => x.tier === tier)?.resources?.map(res => (
                <Box key={res.type} flexDir='row' justifyContent={'space-between'} alignItems='center'>
                  <Box flexDir='row' alignItems='center'>
                    <Image source={utility.icons[res.type]} alt='icon' style={styles.icon} />
                    <Text fontSize={'md'}>{utility.mapName(res.type)}</Text>
                  </Box>

                  <NumberFormat
                    value={Math.ceil(res.value * amount * (1 - ((Number(upgrade.values.troopCost) + Number(upgrade.values[typeValues[troop].cost])) / 100)))}
                    displayType={'text'} thousandSeparator={true}
                    renderText={(value) => <Text fontSize={'md'}>{value}</Text>}
                  />
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
                  {utility.timeString(Troops[troop].find(x => x.tier === tier)?.time * amount)}
                </Text>
              </Box>

              <Box flexDir='row' justifyContent={'space-between'} alignItems='center' mt={1}>
                <Text fontSize={'md'}>
                  Reduced time ({Number(upgrade.values.troopSpeed) + Number(upgrade.values[typeValues[troop].speed])}%)
                </Text>
                <Text fontSize={'md'}>
                  {utility.timeString(Troops[troop].find(x => x.tier === tier)?.time * amount / (1 + ((Number(upgrade.values.troopSpeed) + Number(upgrade.values[typeValues[troop].speed])) / 100)))}
                </Text>
              </Box>

            </Box>
          </Box>
        </>}

    </ScrollView>
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

export default Troop