import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from "native-base"
import React, { useEffect } from 'react'
import { LogBox } from 'react-native'
import mobileAds from 'react-native-google-mobile-ads'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import { UpgradeProvider } from './contexts/UpgradeContext'
import { navigationTheme, theme } from './helpers/theme'
import HomeStack from './navigation/StackNavigation'

LogBox.ignoreLogs(['EventEmitter.removeListener'])

mobileAds().initialize().then(status => console.log(status))

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer theme={navigationTheme}>

            <UpgradeProvider>

                  <HomeStack />

            </UpgradeProvider>

          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;