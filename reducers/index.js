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
        question: 'Does React Native work with Android?',
        answer: true,
      },
      {
        question: 'Are Ajax requests made in the componentDidMount lifecycle event?',
        answer: true,
      },
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'Closure is the combination of a function and the lexical environment within which that function was declared.',
        answer: true,
      }
    ]
  },
  Css: {
    title: 'Css',
    questions: [
      {
        question: 'BorderWidth property adjusts color of the border.',
        answer: false,
      },
    ]
  },
  Html: {
    title: 'Html',
    questions: [
      {
        question: 'Html does not have its own syntax.',
        answer: false,
      },
      {
        question: 'Html does not have its own syntax.',
        answer: false,
      },
    ]
  },
}

export default entries