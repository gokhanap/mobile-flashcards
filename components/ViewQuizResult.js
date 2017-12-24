import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux'

function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity
      style={[styles.textButton, style]}
      onPress={onPress}>
        <Text style={styles.textButtonText}>{children}</Text>
    </TouchableOpacity>
  )
}

class ViewQuizResult extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    // title: navigation.state.params.title,
    title: 'Quiz Result',
  })

  onBackToDeck = () => {
    const { navigate } = this.props.navigation
    const { title } = this.props.navigation.state.params
    navigate('ViewDeck', {'title': title})
  }

  onStartQuiz = () => {
    console.log(this.props)
    const { navigate } = this.props.navigation
    const { title } = this.props.navigation.state.params
    navigate('ViewQuiz', {'title': title})
  }

  render() {
    const { numberOfQuestions, score, title } = this.props.navigation.state.params
    const sQ = numberOfQuestions > 1 ? 's' : ''
    const s = score > 1 ? 's' : ''
    const computedScore = score * 10

    return (

      <View style={styles.container}>
        <View style={{marginBottom: 40}}>
          <Text style={styles.deckTitle}>Your Score</Text>
          <Text style={styles.deckText}>You get {computedScore} points on {title} quiz. You correctly answered {score} question{s} out of {numberOfQuestions} question{sQ}.</Text>
        </View>

        <TextButton style={{backgroundColor: 'salmon'}}
        onPress={this.onStartQuiz}>RESTART QUIZ</TextButton>

        <TextButton style={{backgroundColor: 'salmon'}}
        onPress={this.onBackToDeck}>BACK TO DECK</TextButton>

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
    fontSize: 32,
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

export default connect()(ViewQuizResult)