import React, { Component} from 'react';
import { Link } from 'react-router';

import SearchButton from './Search/SearchButton';
import RouteButton from './Routing/RouteButton';
import CurrentLocation from './CurrentLocation/CurrentLocation';

class Home extends Component {
  render() {
    console.log('home is being rendered');
    return (
      <div>
        <div className = "searchBoxContainer">
          <Link to = '/search'> <SearchButton/> </Link>
          <Link to = '/direction'> <RouteButton /> </Link>
        </div>
        <CurrentLocation
          setCurrentLocation = {this.setCurrentPoint} />
      </div>
    )
  }
}

module.exports = Home;