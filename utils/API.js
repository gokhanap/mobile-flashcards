import { AsyncStorage } from 'react-native'
export const FLASHCARDS_STORAGE_KEY = 'flashcards:decks'

export function fetchFlashcards (name) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(results => JSON.parse(results))
}

export function submitFlashcards (data) {
  console.log(data)
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
  .then(results => console.log(JSON.parse(results)))
}

export function removeDeck () {
  return AsyncStorage.clear()
}