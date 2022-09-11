import { DateTime } from "luxon";
import React, { createContext, useEffect, useState } from "react";
import * as questApi from '../api/quest'

export const QuestContext = createContext()

export const QuestProvider = ({ children }) => {
  const [current, setCurrent] = useState()
  const [upcoming, setUpcoming] = useState()
  const [now, setNow] = useState(DateTime.utc())

  useEffect(() => {
    const timer = setTimeout(() => setNow(DateTime.utc()), 60000)

    return () => clearTimeout(timer)
  }, [now])

  useEffect(() => {
    async function fetchQuests() {
      const data = await questApi.getQuests()

      if (data) {
        setCurrent(data.filter(quest => quest.startTime <= now.toISODate()))
        setUpcoming(data.filter(quest => quest.startTime > now.toISODate()))
      }
    }

    fetchQuests()
  }, [])

  return (
    <QuestContext.Provider
      value={{
        current,
        upcoming,
        now
      }}
    >
      {children}
    </QuestContext.Provider>
  );
};