import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Platform, Alert } from 'react-native';
import { connect } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'
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

class ViewDeck extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  })

  state = {
    title: '',
    numberOfCards: 0,
  }

  componentWillMount () {
    const { title } = this.props.navigation.state.params
    this.setState({title})
    this.countCards()
  }

  countCards = () => {
    const { title } = this.props.navigation.state.params
    const numberOfCards = Object.keys(this.props.flashcards[title].questions).length
    this.setState({numberOfCards})
  }
  onAddCard = () => {
    const { navigate } = this.props.navigation
    const { title } = this.state
    navigate('AddNewQuestion', {'title': title})
  }

  onStartQuiz = () => {
    const { navigate } = this.props.navigation
    const { title, numberOfCards } = this.state

    numberOfCards > 0
    ?
    navigate('ViewQuiz', {'title': title})
    :
    Alert.alert('There is no question on this deck.')
  }

  onDeckList = () => {
    const { navigate } = this.props.navigation
    console.log(this.props.navigation)
    navigate('Home')
  }

  render() {
    const { navigate } = this.props.navigation
    const { title, numberOfCards } = this.state

    return (
      <View style={styles.container}>

        <View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity
          onPress={() => navigate('ListDecks')}>
            <Ionicons color={'gray'} name={'md-close'} size={30}/>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.deckText}>{numberOfCards} cards</Text>

          <TextButton style={{marginTop: 40}}
          title={title}
          onPress={this.onAddCard}>ADD CARD</TextButton>

          <TextButton style={{backgroundColor: 'salmon'}}
          title={title}
          onPress={this.onStartQuiz}>START QUIZ</TextButton>
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
    fontSize: 32,
    textAlign: 'center',
  },
  deckText: {
    fontFamily: 'Ubuntu-Regular',
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
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

const mapStateToProps = (state, { navigation }) => ({
  flashcards: state
})

export default connect(mapStateToProps)(ViewDeck)