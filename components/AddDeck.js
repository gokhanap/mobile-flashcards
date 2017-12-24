import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { addDeck } from '../actions'
import { submitFlashcards, submitNewDeck } from '../utils/API.js'
import { Ionicons } from '@expo/vector-icons'
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

    if (title !== '') {

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

      //go to new deck
      navigate('ViewDeck', {'title': title})
    } else {
      Alert.alert('Please type a deck name.')
    }
  }

  render() {
    const { title } = this.state
    const { goBack } = this.props.navigation
    return (

      <View style={styles.container}>

        <View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity
          onPress={() => goBack()}>
            <Ionicons color={'gray'} name={'md-close'} size={30}/>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, justifyContent: 'center'}} >
          <View style={{marginBottom: 40}}>
            <Text style={styles.deckTitle}>What is the title of your new deck?</Text>
            <TextInput style={styles.textInput}
            onChangeText={(title) => this.setState({title})}
            value={title} />
          </View>

          <TouchableOpacity style={styles.textButton} onPress={this.submit}>
            <Text style={styles.textButtonText}>Create Deck</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    borderRadius: 10,
    margin: 20,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { height: 0, width: 0 },
    elevation: 3,
  },
  deckTitle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deckText: {
    fontFamily: 'Ubuntu-Regular',
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  textInput: {
    fontSize: 14,
    textAlign: 'center',
    height: 40,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: 'salmon',
  },
  textButton: {
    backgroundColor: 'salmon',
    padding: 10,
    borderRadius: 7,
    height: 35,
    margin: 5,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'center',
  },
  textButtonText: {
    fontFamily: 'Ubuntu-Regular',
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});

const mapStateToProps = (state, props) => ({
  flashcards: state
})

const mapDispatchToProps = (dispatch) => ({
  addDeck: (data) => dispatch(addDeck(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)