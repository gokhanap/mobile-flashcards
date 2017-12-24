import React from 'react';
import { StyleSheet, Platform, View, StatusBar } from 'react-native';
import ListDecks from './components/ListDecks';
import AddDeck from './components/AddDeck';
import ViewDeck from './components/ViewDeck';
import AddNewQuestion from './components/AddNewQuestion';
import ViewQuiz from './components/ViewQuiz';
import ViewQuizResult from './components/ViewQuizResult';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants, Font } from 'expo'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'
import { Entypo } from '@expo/vector-icons'

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
    navigationOptions: {
      tabBarLabel: 'List Decks',
      tabBarIcon: ({ tintColor }) => <Entypo name='list' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <Entypo name='add-to-list' size={30} color={tintColor} />
    }
  },
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? 'salmon' : 'white',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'white' : 'salmon',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  },
});

const MainNavigation = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    }
  },
  ViewDeck: {
    screen: ViewDeck,
    navigationOptions: {
      headerTintColor: 'salmon',
      headerStyle: {
        backgroundColor: 'white',
      }
    }
  },
  AddNewQuestion: {
    screen: AddNewQuestion,
    navigationOptions: {
      headerTintColor: 'salmon',
      headerStyle: {
        backgroundColor: 'white',
      }
    }
  },
  ViewQuiz: {
    screen: ViewQuiz,
    navigationOptions: {
      headerTintColor: 'salmon',
      headerStyle: {
        backgroundColor: 'white',
      }
    }
  },
  ViewQuizResult: {
    screen: ViewQuizResult,
    navigationOptions: {
      headerTintColor: 'salmon',
      headerStyle: {
        backgroundColor: 'white',
      }
    }
  },
},
{
  headerMode: 'none',
  mode: 'modal',
  navigationOptions: {
    gesturesEnabled: false,
  },
})

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  }

  async componentWillMount() {
    await Font.loadAsync({
        'Ubuntu-Regular': require('./assets/fonts/Ubuntu-Regular.ttf'),
        'Ubuntu-Bold': require('./assets/fonts/Ubuntu-Bold.ttf'),
      })
    this.setState({ fontLoaded: true })
    setLocalNotification()
  }

  render() {
    return this.state.fontLoaded && (
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
