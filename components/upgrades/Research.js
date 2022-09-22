import React, { useContext, useEffect, useState } from 'react'
import { Box, Center, CheckIcon, Divider, HStack, Icon, IconButton, Image, Input, ScrollView, Select, Text, VStack } from "native-base"
import { StyleSheet, View, useWindowDimensions, TouchableWithoutFeedback } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import NumberFormat from 'react-number-format';
import Feather from 'react-native-vector-icons/Feather'
import ResearchTrees from '../../data/research'
import * as utility from '../../helpers/utilities';
import { UpgradeContext } from '../../contexts/UpgradeContext';
import HelpSettings from './HelpSettings';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { APP_ID } from "../../helpers/utilities";

const adUnitId = __DEV__ ? APP_ID.TEST_BANNER : APP_ID.BANNER;

const Research = () => {
  const upgrade = useContext(UpgradeContext)

  const [level, setLevel] = useState("")
  const [researchTree, setResearchTree] = useState()
  const [research, setResearch] = useState("");
  const [reduction, openReduction] = useState(false)
  const [reducedSeconds, setReducedSeconds] = useState(0)
  const [helpSeconds, setHelpSeconds] = useState(0)

  let levels = []
  for (let i = 1; i <= 10; i++) {
    levels.push(<Select.Item label={String(i)} value={String(i)} />)
  }

  useEffect(() => {
    if (!level || !research || !ResearchTrees[researchTree][research].find(x => x.level === level)) return;

    const reducedSecs = Math.ceil(ResearchTrees[researchTree][research].find(x => x.level === level).time / (1 + (upgrade.values.research / 100)))

    setReducedSeconds(reducedSecs)
    setHelpSeconds(utility.calcHelpTime(reducedSecs, utility.helps(upgrade.values.hoa), upgrade.values.help1, upgrade.values.help2))

  }, [level, research, upgrade.values])

  useEffect(() => {
    setResearch('')
  }, [researchTree])

  useEffect(() => {
    if (researchTree && research && ResearchTrees[researchTree][research]?.length === 1) {
      setLevel('1')
    } else {
      setLevel('')
    }
  }, [research])

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
              Research Speed
            </Text>

            <Box width='100' height={10}>
              <Input
                size="md"
                value={upgrade.values.research}
                onChangeText={(text) => upgrade.updateValue('research', text)}
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
            Research
          </Text>

          <Box width='100%' mr={'2%'} mt={1}>
            <Select size='md' selectedValue={researchTree} accessibilityLabel="Select Research Tree" placeholder="Select Research Tree" _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => setResearchTree(itemValue)}>
              {React.Children.toArray(
                Object.keys(ResearchTrees).map(tree => <Select.Item label={utility.mapName(tree)} value={tree} />)
              )}
            </Select>
          </Box>

          {researchTree && <HStack width={'100%'} alignItems={'flex-end'} mt={1}>

            <Box width='73%' mr={'2%'}>
              <Select size='md' selectedValue={research} accessibilityLabel="Select Research" placeholder="Select Research" _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }} mt={1} onValueChange={itemValue => setResearch(itemValue)}>
                {React.Children.toArray(
                  Object.keys(ResearchTrees[researchTree]).map(_research => <Select.Item label={utility.mapName(_research)} value={_research} />)
                )}
              </Select>
            </Box>

            {Boolean(research) && <Box width='25%'>
              <Select size='md' selectedValue={level} placeholder={`Lv.`} _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
              }} mt={1} onValueChange={itemValue => setLevel(itemValue)}>
                {React.Children.toArray(levels.slice(0, ResearchTrees[researchTree][research]?.length))}
              </Select>
            </Box>}

          </HStack>}

        </Box>

      </Box >

      {Boolean(research) && Boolean(level) &&
        <>
          <Box style={[styles.section, { backgroundColor: '#1F1B24' }]}>
            <Text fontSize={'md'} color='light.400'>
              Requirements
            </Text>

            <Box mt={1}>
              {ResearchTrees[researchTree][research]?.find(x => x.level === level)?.requirements.map(req => (
                <Box key={req.type} flexDir='row' justifyContent={'space-between'} alignItems='center'>
                  <Text fontSize={'md'}>{utility.mapName(req.type)}</Text>
                  <Text fontSize={'md'}>{req.level}</Text>
                </Box>)
              )}
            </Box>
          </Box>

          <Box style={[styles.section, { backgroundColor: '#1F1B24' }]}>
            <Text fontSize={'md'} color='light.400'>
              Cost
            </Text>

            <Box mt={1}>
              {ResearchTrees[researchTree][research]?.find(x => x.level === level)?.resources.map(res => (
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
                  {utility.timeString(ResearchTrees[researchTree][research]?.find(x => x.level === level)?.time)}
                </Text>
              </Box>

              <Box flexDir='row' justifyContent={'space-between'} alignItems='center' mt={1}>
                <Text fontSize={'md'}>
                  Reduced time ({upgrade.values.research}%)
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

export default Research