import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

const DEFAULT_AVATAR = 'https://project.inria.fr/peach/files/2016/03/anonymous.png' 
const AVATAR_SIZE = 32

const Comment = (props) => 
  <View style={styles.comment}>
    { 
      props.avatar ? 
      <Image style={styles.avatar} source={{ uri: props.avatar }} /> :
      <Image style={styles.avatar} source={{ uri: DEFAULT_AVATAR }} />
    }
    
    <Text style={styles.text}>{props.text}</Text>
  </View>

const styles = StyleSheet.create({
  comment: {
    backgroundColor: '#95a5a6',
    padding: 10,
    margin: 5,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: 'white',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  }
})

export default Comment