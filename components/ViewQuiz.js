import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'

class ViewQuiz extends React.Component {
  state = {
    response: '',
    showAnswer: false,
    score: 0,
    currentQuestion: 1,
    numberOfQuestions: 0,
  }

  componentWillMount () {
    const { title } = this.props.navigation.state.params

    const numberOfQuestions = this.props.flashcards[title].questions.length

    this.setState({numberOfQuestions})
    console.log(this.props.flashcards[title].questions)

  }


  nextQuestion = () => {
    const currentQuestion = this.state.currentQuestion + 1
    console.log(currentQuestion)
    this.setState(() => ({
        currentQuestion,
        showAnswer: false
    }))
  }
  render() {
    const { title } = this.props.navigation.state.params
    const { showAnswer, response, currentQuestion, numberOfQuestions } = this.state
    const { question, answer } = this.props.flashcards[title].questions[currentQuestion - 1]

    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{question}</Text>

        {
          showAnswer
          ? <Text style={styles.deckText}>{answer}</Text>
          : <TouchableOpacity>
              <Text onPress={(showAnswer) => this.setState({showAnswer: true})}>View answer</Text>
            </TouchableOpacity>
        }

        <TouchableOpacity onPress={(answer) => this.setState({answer: true})}>
          <Text style={styles.button}>Correct</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={(answer) => this.setState({answer: false})}>
          <Text style={styles.button}>Incorrect</Text>
        </TouchableOpacity>

        {(currentQuestion < numberOfQuestions) &&
        <TouchableOpacity onPress={this.nextQuestion}>
          <Text style={styles.button}>next</Text>
        </TouchableOpacity>
        }
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
  // addQuestion: (title, newQuestion) => dispatch(addQuestion(title, newQuestion)),
  // fetchPosts: (data) => dispatch(fetchPosts(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewQuiz)