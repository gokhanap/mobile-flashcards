import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity
      style={[styles.textButton, style]}
      onPress={onPress}>
        <Text style={styles.textButtonText}>{children}</Text>
    </TouchableOpacity>
  )
}

class ViewQuiz extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Quiz',
  })

  state = {
    showAnswer: false,
    score: 0,
    currentQuestion: 1,
    numberOfQuestions: 0,
    showResult: false,
  }

  componentWillMount () {
    const { title } = this.props.navigation.state.params
    const numberOfQuestions = this.props.flashcards[title].questions.length

    this.setState({numberOfQuestions})
  }

  nextQuestion = (score) => {
    const { navigate } = this.props.navigation
    const { title } = this.props.navigation.state.params
    const currentQuestion = this.state.currentQuestion + 1
    const { numberOfQuestions } = this.state

    currentQuestion <= numberOfQuestions
    ?
    this.setState(() => ({
        currentQuestion,
        showAnswer: false,
    }))
    :
    navigate('ViewQuizResult', {title, numberOfQuestions, score})
  }

  onPressAnswerChoice = (answer) => {
    const recentScore = this.state.score
    console.log(answer)

    if (answer) {
      const newScore = this.state.score + 1
      this.setState(() => ({
        score: newScore
      }))
      this.nextQuestion(newScore)
    } else {
      this.nextQuestion(recentScore)
    }
  }

  render() {
    const { title } = this.props.navigation.state.params
    const { goBack } = this.props.navigation
    const { showAnswer, response, currentQuestion, numberOfQuestions, score, showResult } = this.state
    const { question = 'null' } = this.props.flashcards[title].questions[currentQuestion - 1]
    const answer = this.props.flashcards[title].questions[currentQuestion - 1].answer

    return (
      <View style={styles.container}>

        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.deckTextCount}>
            {currentQuestion} / {numberOfQuestions}
            </Text>
          </View>

          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity
            onPress={() => goBack()}>
              <Ionicons color={'gray'} name={'md-close'} size={30}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.deckTitle}>{question}</Text>

          {
            showAnswer
            ? <Text style={styles.deckText}>{JSON.stringify(answer)}</Text>
            : <TextButton
            onPress={() => this.setState({showAnswer: true})}
            style={{backgroundColor: '#CCCCCCFF'}}>
            VIEW ANSWER</TextButton>
          }
        </View>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 5}}>
            <TextButton
            onPress={() => this.onPressAnswerChoice(answer === true)}
            style={{backgroundColor: '#99CC33FF'}}>
            CORRECT</TextButton>

            <TextButton
            onPress={() => this.onPressAnswerChoice(answer === false)}
            style={{backgroundColor: '#FF6633FF'}}>
            INCORRECT</TextButton>
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  deckText: {
    fontFamily: 'Ubuntu-Regular',
    color: 'gray',
    fontSize: 14,
    textAlign: 'center',
  },
  deckTextCount: {
    fontFamily: 'Ubuntu-Regular',
    color: 'gray',
    fontSize: 14,
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

export default connect(mapStateToProps)(ViewQuiz)