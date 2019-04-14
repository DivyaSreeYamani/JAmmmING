import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {

  render() {
  //  console.log("HERE"+this.props.searchResults);
  return (<div className="SearchResults">
      <h2>Results</h2>
      <TrackList tracks={this.props.searchResults} isRemoval={false} onAdd={this.props.onAdd} />
    </div>);
  }
}

export default SearchResults;
