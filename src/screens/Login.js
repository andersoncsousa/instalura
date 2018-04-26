import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Button,
  Image,
  AsyncStorage,
  Text
} from 'react-native';

export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            usuario: '',
            senha: '',
            validacao: ''
        }
    }

    efetuaLogin = () => {
        const request = {
            method: 'post',
            body: JSON.stringify({
                login:  this.state.usuario,
                senha: this.state.senha
            }),
            headers: new Headers({
                "Content-type": "application/json"
            }) 
        }

       const uri = 'https://instalura-api.herokuapp.com/api/public/login'
       fetch(uri, request)
         .then(response => {
             console.warn(JSON.stringify(response))
            if(!response.ok) 
                throw new Error('Não foi possível efetuar login');

            return response.text()
         })
         .then(token => {

            const usuario = {
                nome: this.state.usuario,
                token
            }
            AsyncStorage.setItem('usuario', JSON.stringify(usuario))

            AsyncStorage.getItem('usuario')
                .then(usuarioStringified => JSON.parse(usuarioStringified))
                .then(usuario => console.warn(usuario.nome))
         })
         .catch(error => {
            this.setState({validacao: error.message})
         })
    }

    render() {
        return (
            <View style={styles.container}>

                <Image source={require('../../resources/img/instalura.png')} />
                <View style={styles.form}>
                    <TextInput style={styles.input}
                        autoCapitalize="none"
                        underlineColorAndroid="transparent"
                        placeholder="Usuário ..."
                        returnKeyType={"next"}
                        onChangeText={texto => this.setState({usuario: texto})}/>
                    
                    <TextInput  style={styles.input}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        underlineColorAndroid="transparent"
                        placeholder="Senha ..."
                        onChangeText={texto => this.setState({senha: texto})}/>
                    
                    <Button title="Login"
                        onPress={this.efetuaLogin}/>
                </View>

                <Text style={styles.validacao}>
                    {this.state.validacao}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        width: Dimensions.get('screen').width * 0.8
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    validacao: {
        color: 'red'
    }
})