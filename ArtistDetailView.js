import React, { Component } from 'react';
import {
  StyleSheet,
  View, 
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';

// importando las fuentes e iconos desde el paquete externo 
import Icon from 'react-native-vector-icons/Ionicons';
// importo el componente de Listas de artistas
import ArtistBox from './ArtistBox';
//importo el componente de listas de comentarios
import CommentList from './CommentList';
//importo la BBDD de firebase para almacenar likes.
import { firebaseDatabase, firebaseAuth } from './firebase';
// importo la funcion getArtist que contiene la data del APi fmlast
import { getArtists } from './api-client';


export default class ArtistDetailView extends Component {
  state = {
    comments: []
  }

  componentDidMount () {
    this.getArtistCommentsRef().on('child_added', this.addComment);
  }
 
 addComment = (data) => {
      const comment = data.val()
      this.setState({
        comments: this.state.comments.concat(comment)  
      })
    }

  componentWillMount() {
    this.getArtistCommentsRef().off('child_added', this.addComment);
  }

   
  handleSend = () => {
    const { text } = this.state
    const { uid, photoURL } = firebaseAuth.currentUser
    const idArtist = this.getArtistCommentsCountRef()

    const artistCommentsRef = this.getArtistCommentsRef()
    var newCommentRef = artistCommentsRef.push();
    newCommentRef.set({ 
      text,
      userPhoto: photoURL,
      uid,
   });
    this.setState({ text: '' })

    idArtist.transaction(function (totalComments) {
            if (totalComments) {
                totalComments.commentCount++
            }
            return totalComments || {
                commentCount: 1
            }
        });
       

  }

  getArtistCommentsRef = () => {
        // me traigo el id del artista (desde api-client >> id: artist.mbid)
        const { id } = this.props.artist
        return firebaseDatabase.ref(`comments/${id}`)
  }

  getArtistCommentsCountRef = () => {
        // me traigo el id del artista (desde api-client >> id: artist.mbid)
        const { id } = this.props.artist
        return firebaseDatabase.ref(`artistCommentsCount/${id}`)
  }

  handleChangeText = (text) => this.setState({ text })

  render() { 
    const artist = this.props.artist
    const { comments } = this.state
    
    return (
      <View style={styles.container}>
        <ArtistBox artist={artist}/>
        <CommentList comments={comments} />
        <View style={styles.inputContaier}>
          <TextInput
            style={styles.input}
            value={this.state.text}
            placeholder="Opina sobre este artista"
            onChangeText={this.handleChangeText}
          />
          <TouchableOpacity onPress={this.handleSend}>
              <Icon name="ios-send-outline" size={30} color="gray" />  
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: 70,
  },
  inputContaier: {
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  }, 
  input: {
    flex: 1,
    height: 50,
  }, 
  header: {
    fontSize: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    color: 'black',
  }
  });

