import React, { Component} from 'react'

import SearchButton from './Search/SearchButton'
import RouteButton from './TurnByTurn/RouteButton'
import CurrentLocation from './CurrentLocation/CurrentLocation'

class Home extends Component {
  render() {
    return (
      <div>
        <div className = "searchBoxContainer">
          <SearchButton/>
          <RouteButton />
        </div>
        <CurrentLocation />
      </div>
    )
  }
}

module.exports = Home;