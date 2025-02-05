import axios from 'axios'

import { Word } from '@/types'

const url = 'http://localhost:3000/api/v1'

let cachedTodayWord: Word | null = null

export const getTodayWord = async () => {
  if (cachedTodayWord) {
    return cachedTodayWord
  }

  const response = await axios.get<Word>(`${url}/words/today`)
  cachedTodayWord = response.data
  return cachedTodayWord
}
