
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      searchResults : [{
        name: 'My Sweet Lord',
        artist: 'George Harrison',
        album: 'All Things Must Pass (Remastered)',
        id: '123',
      }],
        //7GJOFsyNN2u7yii6fOc8bo
        //7GJOFsyNN2u7yii6fOc8bo


      playlistName: 'Hare Krishna',
      playlistTracks : [
        {
          name: 'Ceili in Braj',
          artist: 'Jahnavi Harrison',
          album: 'Like a River to the Sea',
          id: '108',
          uri: 'spotify:album:7GJOFsyNN2u7yii6fOc8bo',
        },
        {
          name: 'Like a River (Govinda Damodara Madhaveti)',
          artist: 'Jahnavi Harrison',
          album: 'Like a River to the Sea',
          id: '111',
          uri: 'spotify:album:7GJOFsyNN2u7yii6fOc8bo',
        }
      ],
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack =>
      savedTrack.id === track.id)){
      return;}
    else{
        const arr = this.state.playlistTracks.concat(track);
        this.setState({
          playlistTracks:arr,
        });
      }
    }

  removeTrack(track) {
    if(this.state.playlistTracks.find(savedTrack =>
      savedTrack.id === track.id)){
      this.setState({playlistTracks: this.state.playlistTracks.filter(remtrack => remtrack.id !== track.id)});
      }
    else{
        return;
        }
  }

  updatePlaylistName(name){
    this.setState({
      playlistName: name,
    });
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(a=> a.uri);
    console.log("Playlist name: "+ this.state.playlistName + " AND TrackURISs: "+trackURIs);
    Spotify.savePlaylist(this.state.playlistName,trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: [],
    });

  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar onSearch={this.search} />
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd = {this.addTrack}/>
          <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks}
          onNameChange={this.updatePlaylistName} onRemove ={this.removeTrack}
          onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
