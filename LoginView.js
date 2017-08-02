import React, { Component } from 'react';
import {
  StyleSheet,
  View, 
  Text, 
  Image,
} from 'react-native';

import FBSDK, { LoginButton, AccessToken } from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';

// importo el componente de firebase con las key
import  firebase,  { firebaseAuth } from './firebase';

const { FacebookAuthProvider } = firebase.auth

export default class LoginView extends Component {
  state = {
    credentials : null
  }
 
  componentWillMount() {
    this.authenticateUser()
  }

  // creo un metodo para guardar las credenciales del usuario autentuicado con facebook
  authenticateUser = () => {
      AccessToken.getCurrentAccessToken().then((data) => {
        const { accessToken } = data          
        // Sign in user with another account
        const credential = FacebookAuthProvider.credential(accessToken)
        firebaseAuth.signInWithCredential(credential).then((credentials) => {
            Actions.root()  
        }, function(error) {
            console.log("Sign In Error", error);
        });
      }) 
  }

  handleLoginFinished = (error, result) => {
    if (error) {
        console.error(error)
    } else if (result.isCancelled) {
        alert("login is cancelled.");
    } else {
          this.authenticateUser()
      }
    }

    handleButtonPress = () => {
      Actions.root()
    } 

  render() {     
    return (
      <Image source={require('./maikolMusic.jpg')} style={styles.container}>
        <Text style={styles.welcome}>
          Bienvenidos a Maikol Music
        </Text>
        <LoginButton
          readPermissions={['public_profile', 'email']}
          onLoginFinished={this.handleLoginFinished}
          onLogoutFinished={() => alert("logout.")}/>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null, 
    height: null,
    backgroundColor: '#bdc3c7',
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 30,
      color: '#fff',
      width: 200,
      textAlign: 'center',
      opacity: 0.9, 
      backgroundColor: 'transparent',
  },
  user: {
    backgroundColor: '#34495e',
    padding: 10,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#fff',
    width: 200,
    textAlign: 'center',
    opacity: 0.9
  }
  });

