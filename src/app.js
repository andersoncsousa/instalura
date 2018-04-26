import { AppRegistry } from 'react-native';
import Feed from './components/Feed';
import Login from './screens/Login';
import {Navigation} from 'react-native-navigation'
import {AsyncStorage} from 'react-native'

import LoginScreen from './screens/Login'

export default () => {
    Navigation.registerComponent('LoginScreen', () => Login)
    Navigation.registerComponent('FeedScreen', () => Feed)

    AsyncStorage.getItem('usuario')
        .then(usuario => {
            if(usuario){
                return {
                    screen: 'FeedScreen',
                    title: 'Instalura'
                }
            }
            return {
                screen: 'LoginScreen',
                title: 'Login',
                //navigatorStyle: {
                //    navBarHidden: true
                //}
            }
        })
        Navigation.startSingleScreenApp({screen})
}
