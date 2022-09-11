import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const UpgradeContext = createContext()

export const UpgradeProvider = ({ children }) => {
  const [values, setValues] = useState({
    construction: '0',
    research: '0',
    troopCost: '0',
    troopSpeed: '0',
    infSpeed: '0',
    infCost: '0',
    archSpeed: '0',
    archCost: '0',
    cavSpeed: '0',
    cavCost: '0',
    hoa: '1',
    help1: '0',
    help2: '0'
  })

  useEffect(() => {
    getStoredValues()
  }, [])

  useEffect(() => {
    saveUpgradeData(values)
  }, [values])

  async function saveUpgradeData(data) {
    try {
      await AsyncStorage.setItem('upgrade_values', JSON.stringify(data))
    } catch (e) {
      console.log('Failed to save upgrade values', e)
    }
  }

  async function getStoredValues() {
    try {
      const data = await AsyncStorage.getItem('upgrade_values')

      if (data !== null) {
        setValues(JSON.parse(data))
      }
    } catch (e) {
      console.log('Failed to retrieve upgrade values', e)
    }
  }

  const updateValue = (name, value) => {
    value = value.replace(',', '.')

    if (isNaN(Number(value))) return;

    setValues(prev => ({ ...prev, [name]: value }))
  }

  return (
    <UpgradeContext.Provider
      value={{
        values,
        updateValue
      }}
    >
      {children}
    </UpgradeContext.Provider>
  );
};