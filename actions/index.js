export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveDecks (entries) {
    return {
        type: RECEIVE_DECKS,
        entries
    }
}

export function addDeck (newDeckName) {
    return {
        type: ADD_DECK,
        newDeckName
    }
}

export function addQuestion (deckName, newQuestion) {
    console.log(deckName)
    return {
        type: ADD_QUESTION,
        deckName,
        newQuestion
    }
}