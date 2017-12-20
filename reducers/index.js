import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION } from '../actions'

function entries (state = defaultData, action) {

  const { newDeckName, deckName, newQuestion } = action

  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.entries
      }
    case ADD_DECK :
      return {
        ...state,
        [newDeckName]: {
          'title': newDeckName,
          'questions': []
        }
      }
    case ADD_QUESTION :
    console.log(newQuestion, deckName)
      return {
        ...state,
        [deckName]: {
          ...state[deckName],
          questions: [
          ...state[deckName].questions,
          newQuestion
          ]
        }
      }
    default:
      return state
  }
}

const defaultData = {
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


export default entries