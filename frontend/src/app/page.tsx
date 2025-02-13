'use client'
import Wordle from '@/components/Wordle'
import { getTodayWord } from '@/services/wordService'
import { Word } from '@/types'
import { useEffect, useState } from 'react'

export default function Home() {
  const [solution, setSolution] = useState<Word>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    getTodayWord().then((word) => {
      if (word) {
        setSolution(word)
        setIsLoading(false)
      }
    })
  }, [])

  return <Wordle solution={solution} isLoading={isLoading} />
}
