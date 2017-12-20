import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { addDeck } from '../actions'
import { submitFlashcards, submitNewDeck } from '../utils/API.js'

import { connect } from 'react-redux'

class AddDeck extends React.Component {
  state = {
    title: ''
  }

  clearState = () => {
    this.setState(() => ({
        title: ''
    }))
  }


  submit = () => {
    const title = this.state.title
    const { goBack, navigate } = this.props.navigation

    //update Redux
    this.props.addDeck(title)

    // update asyncstorage
    submitFlashcards({
      ...this.props.flashcards,
      [title]: {
        'title': title,
        'questions': []
      }})

    //clear form input
    this.clearState()

    //go back
    // goBack()

    //go to new deck
    navigate('ViewDeck', {'title': title})
  }

  render() {
    const { title } = this.state

    // console.log(this.props)

    return (
      <View style={styles.container}>

        <View style={styles.container}>
          <Text style={styles.deckTitle}>What is the title of your new deck?</Text>
          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(title) => this.setState({title})}
          value={title} />
        </View>

        <View style={styles.container}>
          <TouchableOpacity onPress={this.submit}>
            <Text style={styles.button}>Create Deck</Text>
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
    borderWidth: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 30,
  },
  deckTitle: {
    padding: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deckText: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    width: 200,
    padding: 10,
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'gray',

  },
});

const mapStateToProps = (state, props) => ({
  flashcards: state
})

const mapDispatchToProps = (dispatch) => ({
  addDeck: (data) => dispatch(addDeck(data)),
  // fetchPosts: (data) => dispatch(fetchPosts(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)