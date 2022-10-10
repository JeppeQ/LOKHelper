import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTime } from "luxon";
import React, { createContext, useEffect, useState } from "react";
import * as questApi from '../api/quest'

export const QuestContext = createContext()

export const QuestProvider = ({ children }) => {
  const [continent, setContinent] = useState()
  const [current, setCurrent] = useState()
  const [upcoming, setUpcoming] = useState()
  const [now, setNow] = useState(DateTime.utc())

  async function saveContinent(data) {
    try {
      await AsyncStorage.setItem('continent', data)
    } catch (e) {
      console.log('Failed to save upgrade values', e)
    }
  }

  async function getStoredValues() {
    try {
      const data = await AsyncStorage.getItem('continent')

      if (data !== null) {
        setContinent(data)
      }
    } catch (e) {
      console.log('Failed to retrieve upgrade values', e)
    }
  }

  useEffect(() => {
    getStoredValues()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setNow(DateTime.utc()), 60000)

    return () => clearTimeout(timer)
  }, [now])

  useEffect(() => {
    async function fetchQuests() {
      const data = await questApi.getQuests(continent)

      if (data) {
        setCurrent(data.filter(quest => quest.startTime <= now.toISODate()))
        setUpcoming(data.filter(quest => quest.startTime > now.toISODate()))
      }
    }

    if (continent) {
      saveContinent(continent)
      fetchQuests()
    }
  }, [continent])

  return (
    <QuestContext.Provider
      value={{
        current,
        upcoming,
        now,
        continent,
        setContinent
      }}
    >
      {children}
    </QuestContext.Provider>
  );
};