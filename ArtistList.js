import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  TouchableOpacity
} from 'react-native';

// importo el componente de artistas
import ArtistBox from './ArtistBox';

// importo Actions para pasar a la otra pagina
// pasandole la key establecida en app.js (artistDetail) en este caso
import {Actions} from 'react-native-router-flux';


export default class ArtistList extends Component {
  
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => { r1 !== r2 }});
    
    this.state = {
      dataSource: ds
    }
  }

  componentDidMount() {
      this.updateDataSource(this.props.artists)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.artists !== this.props.artists) {
        this.updateDataSource(newProps.artists)

    }
  }

  updateDataSource = (data) => {
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data)
      })
  }

  handlePress(artist) {
      Actions.artistDetail({ artist })
  }

  render() { 
    return (     
      <ListView
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={(artist) => {
            return (
                <TouchableOpacity 
                    onPress={() => this.handlePress(artist)}>
                    <ArtistBox artist={artist}/>
                </TouchableOpacity>
            )                
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: 50,
  },
  });

