import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { addQuestion } from '../actions'
import { submitFlashcards, submitNewDeck } from '../utils/API.js'

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
        answer: ''
    }))
  }

  submit = () => {
    const newQuestion = {...this.state}
    const { title } = this.props.navigation.state.params
    const { goBack, navigate } = this.props.navigation

    //update Redux
    this.props.addQuestion(title, newQuestion)

    // update asyncstorage
    submitFlashcards({
      ...this.props.flashcards,
      [title]: {
        ...this.props.flashcards[title],
        questions: {
          ...this.props.flashcards[title].questions,
          newQuestion
        }
      }
    })

    //clear form input
    this.clearState()

    //go to new deck
    navigate('ViewDeck', {'title': title})
  }

  render() {
    const { question, answer } = this.state

    // console.log(this.props)

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.deckTitle}>What is the title of your new deck?</Text>
          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(question) => this.setState({question})}
          placeholder={'question'}
          value={question} />
          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(answer) => this.setState({answer})}
          placeholder={'answer'}
          value={answer} />
        </View>

        <View style={styles.container}>
          <TouchableOpacity onPress={this.submit}>
            <Text style={styles.button}>Submit</Text>
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
  addQuestion: (title, newQuestion) => dispatch(addQuestion(title, newQuestion)),
  // fetchPosts: (data) => dispatch(fetchPosts(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewQuestion)