import { AppRegistry } from 'react-native';
import Feed from './components/Feed';
import Login from './screens/Login';

// logica

export default () => {
    AppRegistry.registerComponent('InstaluraMobile', () => Login);
}
