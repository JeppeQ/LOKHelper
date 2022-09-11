import { Box, CheckIcon, Select, Text } from "native-base";
import React, { useContext } from 'react';
import { UpgradeContext } from '../../contexts/UpgradeContext';

const HelpSettings = () => {
  const upgrade = useContext(UpgradeContext)

  let levels = []
  for (let i = 0; i <= 30; i++) {
    levels.push(<Select.Item label={String(i)} value={String(i)} />)
  }

  return (
    <Box mt={3}>
      <Text fontSize={'sm'} color='light.400'>
        Help Settings
      </Text>

      <Box flexDir='row' justifyContent={'space-between'} alignItems={'center'} mt={0}>
        <Text>Hall of Alliance</Text>

        <Box width='25%' height={10}>
          <Select size='md' selectedValue={upgrade.values.hoa} accessibilityLabel="1-30" placeholder="1-30" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }} onValueChange={itemValue => upgrade.updateValue('hoa', itemValue)}>
            {React.Children.toArray(levels.slice(1))}
          </Select>
        </Box>
      </Box>

      <Box flexDir='row' justifyContent={'space-between'} alignItems={'center'} mt={2}>
        <Text>Alliance help Speedup 1 tech</Text>

        <Box width='25%' height={10}>
          <Select size='md' selectedValue={upgrade.values.help1} accessibilityLabel="0-10" placeholder="0-10" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }} onValueChange={itemValue => upgrade.updateValue('help1', itemValue)}>
            {React.Children.toArray(levels.slice(0, 11))}
          </Select>
        </Box>
      </Box>

      <Box flexDir='row' justifyContent={'space-between'} alignItems={'center'} mt={2} mb={1}>
        <Text>Alliance help Speedup 2 tech</Text>

        <Box width='25%' height={10}>
          <Select size='md' selectedValue={upgrade.values.help2} accessibilityLabel="0-10" placeholder="0-10" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }} onValueChange={itemValue => upgrade.updateValue('help2', itemValue)}>
            {React.Children.toArray(levels.slice(0, 11))}
          </Select>
        </Box>
      </Box>
    </Box>
  )
}

export default HelpSettings
