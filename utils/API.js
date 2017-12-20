import { AsyncStorage } from 'react-native'
export const FLASHCARDS_STORAGE_KEY = 'flashcards:decks'


// export function fetchDecknamesArr () {
//   return AsyncStorage.getAllKeys()
// }

export function fetchFlashcards (name) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(results => JSON.parse(results))
  // .then(results => console.log(results))
}

// export function submitDeckTitle () {
//   return AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
//     'title': deckTitle
//   }))
// }

export function submitFlashcards (data) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
  // .then(results => console.log(results))
}

export function submitNewDeck (title) {
  return
  AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: {
      'title': title,
      'questions': []
    }
  }))
}

export function submitNewQuestionToDeck (title, newQuestion) {
  return
  AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: {
    }
  }))
}

export function removeDeck () {
  return AsyncStorage.clear()
}


  const decks = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }