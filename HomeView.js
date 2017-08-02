import React, { Component } from 'react';
import {
  StyleSheet,
  View, 
  ActivityIndicator,
  Platform,
} from 'react-native';

// importo el componente de Listas de artistas
import ArtistList from './ArtistList';

// importo la funcion getArtist que contiene la data del APi fmlast
import { getArtists } from './api-client';

export default class HomeView extends Component {

  state = {
    artists: null
  }

  componentDidMount() {
    getArtists().then((data) => this.setState({ artists: data }))
  }

  render() { 
    const artists = this.state.artists
    
    return (
      <View style={styles.container}>
        {! artists && <ActivityIndicator size="large" /> } 
        {artists && <ArtistList artists={artists}/> } 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: Platform.select({
      ios: 30, 
      android: 10
   }),
  }
});

