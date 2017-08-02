import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View, 
  Image, 
  TouchableOpacity,
} from 'react-native';

// importando las fuentes e iconos desde el paquete externo 
import Icon from 'react-native-vector-icons/Ionicons';

//importo la BBDD de firebase para almacenar likes.
import { firebaseDatabase, firebaseAuth } from './firebase';

export default class ArtistBox extends Component { 
  state = {
        liked: false,
        likeCount: 0, 
        commentCount: 0
    }

    componentWillMount() {
        const { uid } = firebaseAuth.currentUser
        
        // para los likes
        this.getArtistRef().on('value', snapshot => {
        const artist = snapshot.val() 
            if (artist) {
                this.setState({
                likeCount: artist.likeCount,
                liked: artist.likes && artist.likes[uid]
                })
            }  
        })

        // para los comentarios
        this.getArtistCommentsCountRef().on('value', snapshot => {
        const totalComments = snapshot.val() 
            if (totalComments) {
                this.setState({
                commentCount: totalComments.commentCount
                })
            }  
        })

    }

    handlePress = () => {        
        this.toggleLike()
        //this.toggleLike(!this.state.liked)
    }

  getArtistRef = () => {
        // me traigo el id del artista (desde api-client >> id: artist.mbid)
        const { id } = this.props.artist
        return firebaseDatabase.ref(`artist/${id}`)
  }  

  getArtistCommentsCountRef = () => {
        // me traigo el id del artista (desde api-client >> id: artist.mbid)
        const { id } = this.props.artist
        return firebaseDatabase.ref(`artistCommentsCount/${id}`)
  }  

  toggleLike = (liked) => {
        const { uid } = firebaseAuth.currentUser

        this.getArtistRef().transaction(function(artist) {
        if (artist) {
            if (artist.likes && artist.likes[uid]) {
                artist.likeCount--;
                artist.likes[uid] = null;
            } else {
                artist.likeCount++;
                if (!artist.likes) {
                artist.likes = {};
                }
                artist.likes[uid] = true;
            }
        }
        return artist || {
            likeCount: 1,
            likes: {
                [uid]: true
            }
        };
    });
  }

  render() {    
    // con este objeto obtengo las propiedades del artist,
    // que esta declarado en api-client.js  
    const { image, name, likes, comments} = this.props.artist

    const likeIcon = this.state.liked ?
                    <Icon name="ios-heart" size={30} color="#e74c3c" />  :
                    <Icon name="ios-heart-outline" size={30} color="grey" />    

    const { likeCount } = this.state
    const { commentCount } = this.state


    return (      
          <View style={styles.artistBox}>        
              <Image style={styles.image} source={{uri: image }} />
              <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.row}>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={this.handlePress}>
                            {likeIcon}
                        </TouchableOpacity>
                        <Text style={styles.count}>{likeCount}</Text>   
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="ios-chatbubbles-outline" size={30} color="grey" />   
                        <Text style={styles.count}>{commentCount}</Text>   
                    </View>
                </View>          
              </View>              
          </View>       
      
    );
  }
}

const styles = StyleSheet.create({  
  artistBox: {
      margin: 5,
      flexDirection: 'row',
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOpacity: .2,
      shadowOffset: {
         height : 1,
         width: -2,
      },
      elevation: 2,
  },
  image: {
      width: 150,
      height: 150,
  },
  info: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
  },
  name: {
      fontSize: 20,
      marginTop: 10,
      color: '#333'
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 40,
      marginTop: 15,
  },
  iconContainer:{
      flex: 1,
      alignItems: 'center',
  },
  count: {
      color: 'red',
      fontSize: 16,
  }
});

