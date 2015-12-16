import React, { Component } from 'react'

import ResultRow from './ResultRow';
import SearchTermRow from './SearchTermRow';

export default class ResultTable extends Component {

  //turning off poi search for now  Dec, 2015

  render() {

    let rows = [];
    let rowIndex = 0;

    const { searchData, dataIndex, pointAction } = this.props

    searchData.forEach(result => {
      rows.push( <ResultRow data = {result}
                            key = {result.properties.gid}
                           rowIndex = {rowIndex}
                           dataIndex = {dataIndex}
                           pointAction = {pointAction}/> );
      rowIndex++;
    });

    return(
      <ul className = "table-view search-table">
        {rows}
      </ul>
    );
  }
}
