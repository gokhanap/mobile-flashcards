import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { fetchFlashcards, submitFlashcards, removeDeck } from '../utils/API.js'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

class ListDecks extends React.Component {

  componentDidMount () {
    fetchFlashcards().then(results =>
      results === null
      ? submitFlashcards(this.props.flashcards)
      : this.props.receiveDecks(results))
  }

  updateState = () => {
    const deckNames = Object.keys(this.props.state)
    this.setState((state) => ({
        ...state,
        deckNames: deckNames
    }))
  }

  countCards = (deck) => {
    return Object.keys(this.props.flashcards[deck].questions).length
  }

  render() {
    const { navigate } = this.props.navigation
    const deckNames = Object.keys(this.props.flashcards)

    return (

      <View style={styles.container}>

        <FlatList
          keyExtractor={(item, index) => item}
          data={deckNames}
          renderItem={({item}) => (
              <TouchableOpacity
              style={styles.deckContainer}
              onPress={() => navigate('ViewDeck', {'title': item})}>
                <Text style={styles.deckTitle}>{item}</Text>
                <Text style={styles.deckText}>{this.countCards(item)} CARDS</Text>
              </TouchableOpacity>
            )}
        />

{/*
  // TEST Buttons

        <View>
          <TouchableOpacity onPress={() => fetchFlashcards().then(results => console.log(results))}>
            <Text
            style={styles.deckText}
            >getDecks</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => submitFlashcards(this.props.flashcards)}>
            <Text
            style={styles.deckText}
            >submitFlashcards</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => removeDeck()}>
            <Text
            style={styles.deckText}
            >clear</Text>
          </TouchableOpacity>
        </View>*/}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },

  deckContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'salmon',
    borderBottomWidth: 2,
    borderRadius: 10,
    padding: 20,
    margin: 20,
    marginBottom: 10,
    marginTop: 10,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { height: 0, width: 0 },
    elevation: 3,
  },

  deckTitle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 24,
  },

  deckText: {
    fontFamily: 'Ubuntu-Regular',
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
});

const mapStateToProps = (state, { navigation }) => ({
  flashcards: state
})

const mapDispatchToProps = (dispatch, { navigation }) => ({
  receiveDecks: (data) => dispatch(receiveDecks(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListDecks)