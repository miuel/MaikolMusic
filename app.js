import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View, 
  //Platform
} from 'react-native';

// importo flux para trabajar con paginación
import { Scene, Router } from 'react-native-router-flux';

// importo la pantalla principal
import HomeView from './HomeView';

// importo la pantalla de Login
import LoginView from './LoginView';

import ArtistDetailView from './ArtistDetailView';

class MaikolMusic extends React.Component {
  render() {
    // esta constante me sirve para ocultar o mostrar una navbar por ej en cualquier plataforma:
    //const isAndroid = Platform.OS === 'android'

    return <Router>
      <Scene key="login" component={LoginView} hideNavBar/>
      <Scene key="root">
        <Scene key="home" component={HomeView} hideNavBar/>
        <Scene key="artistDetail" component={ArtistDetailView} hideNavBar={false} title="Comentarios" />
      </Scene>
    </Router>
  }
}

AppRegistry.registerComponent('MaikolMusic', () => MaikolMusic);
