import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { fetchFlashcards, submitFlashcards, removeDeck } from '../utils/API.js'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

class ListDecks extends React.Component {
  state = {
  }


  componentDidMount () {
    // AsyncStorage.setItem('React', JSON.stringify(this.state.React))
    // AsyncStorage.setItem('JavaScript', JSON.stringify(this.state.JavaScript))

    // .then((results) => this.updateState(results))
    fetchFlashcards().then(results =>
      results === null
      ? submitFlashcards(this.props.flashcards)
      : this.props.receiveDecks(results))
    // fetchFlashcards().then(results => this.props.receiveDecks(results))
    //submitFlashcards(this.props.flashcards)

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
    // console.log(this.props.flashcards)
    const deckNames = Object.keys(this.props.flashcards)

    return (
      <View style={styles.container}>

        <FlatList
          keyExtractor={(item, index) => item}
          data={deckNames}
          renderItem={({item}) => (
            <View style={styles.deckContainer}>
              <TouchableOpacity onPress={() => navigate('ViewDeck', {'title': item})}>
                <Text style={styles.deckTitle}>{item}</Text>
                <Text style={styles.deckText}>{this.countCards(item)} cards</Text>
              </TouchableOpacity>
            </View>
            )}
        />


        <View style={styles.deckContainer}>
          <TouchableOpacity onPress={() => fetchFlashcards().then(results => console.log(results))}>
            <Text
            style={styles.deckText}
            >getDecks</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.deckContainer}>
          <TouchableOpacity onPress={() => submitFlashcards(this.props.flashcards)}>
            <Text
            style={styles.deckText}
            >submitFlashcards</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.deckContainer}>
          <TouchableOpacity onPress={() => removeDeck()}>
            <Text
            style={styles.deckText}
            >clear</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  deckContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    padding: 20,
  },
  deckTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  deckText: {
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
  // fetchPosts: (data) => dispatch(fetchPosts(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListDecks)