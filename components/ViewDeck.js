import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux'

class ViewDeck extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  })

  state = {}

  countCards = (deck) => {
    return Object.keys(this.props.flashcards[deck].questions).length
  }

  render() {
    const { navigate } = this.props.navigation
    const { title } = this.props.navigation.state.params
    // console.log(this.props)

    return (
      <View style={styles.container}>

        <View style={styles.container}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.deckText}>{this.countCards(title)} cards</Text>
        </View>

        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigate('AddNewQuestion', {'title': title})}>
            <Text style={styles.button}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('ViewQuiz', {'title': title})}>
            <Text style={styles.button}>Start Quiz</Text>
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
  button: {
    width: 200,
    padding: 10,
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'gray',

  },
});

const mapStateToProps = (state, { navigation }) => ({
  flashcards: state
})

const mapDispatchToProps = (dispatch, { navigation }) => ({
  // fetchCategories: (data) => dispatch(fetchCategories(data)),
  // fetchPosts: (data) => dispatch(fetchPosts(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewDeck)