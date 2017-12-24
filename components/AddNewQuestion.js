import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { addQuestion } from '../actions'
import { submitFlashcards, submitNewDeck } from '../utils/API.js'
import { Ionicons } from '@expo/vector-icons'

import { connect } from 'react-redux'


class AddNewQuestion extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Card',
  })

  state = {
    question: '',
    answer: ''
  }

  clearState = () => {
    this.setState(() => ({
        question: '',
        answer: '',
    }))
  }

  submit = () => {
    const newQuestion = {...this.state}
    const { title } = this.props.navigation.state.params
    const { goBack, navigate } = this.props.navigation
    const { question, answer } = this.state

    if (question !== '' && answer !== '') {

      //update Redux
      this.props.addQuestion(title, newQuestion)

      // update asyncstorage
      submitFlashcards({
        ...this.props.flashcards,
        [title]: {
          ...this.props.flashcards[title],
          questions: [
            ...this.props.flashcards[title].questions,
            newQuestion
          ]
        }
      })

      //clear form input
      this.clearState()

      //go to new deck
      navigate('ViewDeck', {'title': title})
    } else {
      Alert.alert('Please type your question and select the answer.')
    }
  }

  onPressCorrect = () => {
    this.setState(() => ({
      answer: true
    }))
  }

  onPressIncorrect = () => {
    this.setState(() => ({
      answer: false
    }))
  }

  render() {
    const { question, answer } = this.state
    const { goBack } = this.props.navigation

    return (
      <View style={styles.container}>

        <View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity
          onPress={() => goBack()}>
            <Ionicons color={'gray'} name={'md-close'} size={30}/>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{marginBottom: 40}}>
            <Text style={styles.deckTitle}>Please type your question</Text>
            <TextInput style={styles.textInput}
            onChangeText={(question) => this.setState({question})}
            placeholder={'Question'}
            value={question} />
          </View>

          <View style={{marginBottom: 40}}>
            <Text style={styles.deckTitle}>Please select the answer</Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 5}}>

              <TouchableOpacity
              style={[styles.textButtonPassive, answer === true && styles.correctBtn]}
              onPress={this.onPressCorrect}>
                <Text style={styles.textButtonText}>Correct</Text>
              </TouchableOpacity>

              <TouchableOpacity
              style={[styles.textButtonPassive, answer === false && styles.incorrectBtn]}
              onPress={this.onPressIncorrect}>
                <Text style={styles.textButtonText}>Incorrect</Text>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 60}}>
              <TouchableOpacity
              style={styles.textButton} onPress={this.submit}>
                <Text style={styles.textButtonText}>Submit Card</Text>
              </TouchableOpacity>
            </View>

          </View>
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
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
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
    marginTop: 5,
    marginBottom: 5,
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
  textButtonPassive: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 7,
    height: 35,
    margin: 5,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'center',
  },
  correctBtn: {
    backgroundColor: '#99CC33FF',
  },
  incorrectBtn: {
    backgroundColor: '#FF6633FF',
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
  addQuestion: (title, newQuestion) => dispatch(addQuestion(title, newQuestion)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewQuestion)