import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import ListDecks from './components/ListDecks';
import AddDeck from './components/AddDeck';
import ViewDeck from './components/ViewDeck';
import AddNewQuestion from './components/AddNewQuestion';
import ViewQuiz from './components/ViewQuiz';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  ListDecks: {
    screen: ListDecks,
  },
  AddDeck: {
    screen: AddDeck,
  },
});

const MainNavigation = StackNavigator({
  ListDecks: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    }
  },
  ViewDeck: {
    screen: ViewDeck,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
  AddNewQuestion: {
    screen: AddNewQuestion,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
  ViewQuiz: {
    screen: ViewQuiz,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={'black'} barStyle="light-content" />
          <MainNavigation />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 30,
  },
});
