import React, { Component } from 'react';
import {AsyncStorage} from 'react-native'
import {
  AppRegistry,
  StyleSheet,
  FlatList
} from 'react-native';

import Post from './Post';

export default class Feed extends Component {
  
  constructor() {
    super()
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    const uri = 'https://instalura-api.herokuapp.com/api/public/fotos'

    AsyncStorage.getItem('usuario')
      .then(usuarioEmTexto => JSON.parse(usuarioEmTexto))
      .then(usuario => {
        const request = {
          headers: new Headers({
              "X-AUTH-TOKEN": usuario.token
          })
        }
        return request
      })

      .then(request => fetch(uri, request))
      .then(response => response.json())
      .then(json => this.setState({fotos: json}))
  }

  like = (idFoto) => {  
    const foto = this.state.fotos
        .find(foto => foto.id === idFoto)
    
    let novaLista = [];
    if(!foto.likeada) {
      novaLista = [
        ...foto.likers,
        {login: 'meuUsuario'}
      ]
    } else {
      novaLista = foto.likers
        .filter(liker => liker.login != 'meuUsuario')
    }
    
    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    }

    const fotos = this.state.fotos.map(foto => 
      foto.id === fotoAtualizada.id ? fotoAtualizada : foto)
    this.setState({fotos});
    
    const uri = `https://instalura-api.herokuapp.com/api/fotos/${idFoto}/like`
    AsyncStorage.getItem('usuario')
        .then(usuario => JSON.parse(usuario))
        .then(usuario => {
            const request = {
                method: 'POST',
                headers: new Headers({
                    "X-AUTH-TOKEN": usuario.token
                })
            }
            return request
        })
        .then(request => fetch(uri, request))

  
  }

  adicionaComentario = (idFoto, valorComentario) => {
    if(valorComentario === '')
      return;

    const foto = this.state.fotos
        .find(foto => foto.id === idFoto)

    const novaLista = [...foto.comentarios, {
      id: Math.random(),
      login: 'meuUsuario',
      texto: valorComentario
    }]
    
    const fotoAtualizada = {
      ...foto,
      comentarios: novaLista
    }

    const fotos = this.state.fotos.map(foto => 
      foto.id === fotoAtualizada.id ? fotoAtualizada : foto)
    this.setState({fotos})
  }
  
  render() {
    return (
      <FlatList
          data={this.state.fotos}
          keyExtractor={ item => item.id }
          renderItem={ ({item}) =>
              <Post foto={item}
                  likeCallback={this.like}
                  comentarioCallback={this.adicionaComentario}/>
          } />
    );
  }
}