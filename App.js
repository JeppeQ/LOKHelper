import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from "native-base"
import React, { useEffect } from 'react'
import { LogBox } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { QuestProvider } from './contexts/QuestContext'
import { UpgradeProvider } from './contexts/UpgradeContext'
import { theme, navigationTheme } from './helpers/theme'
import HomeStack from './navigation/StackNavigation'
import SplashScreen from 'react-native-splash-screen'

LogBox.ignoreLogs(['EventEmitter.removeListener'])

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
              <QuestProvider>

                <HomeStack />

              </QuestProvider>
            </UpgradeProvider>

          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;