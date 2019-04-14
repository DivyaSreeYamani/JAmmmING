import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {

  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event){
    const value = event.target.value;
    this.props.onNameChange(value);
  }

  render() {
    return (
    <div className="Playlist">
      <input defaultValue={"Hare Krishna"}/>
      <TrackList tracks = {this.props.playlistTracks}
      onRemove = {this.props.onRemove} isRemoval={true}
      onChange = {this.handleNameChange}  />

      <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
    </div>);
  }
}
export default Playlist;
