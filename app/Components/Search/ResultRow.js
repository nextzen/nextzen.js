import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ResultRow extends Component{

  render() {
    const { data, dataIndex, rowIndex, pointAction } = this.props
    return(
      <li className={(dataIndex === rowIndex)? "select table-view-cell search-result" : "table-view-cell search-result"} onClick= {() => pointAction(data)} > {data.properties.label} </li> 
    );
  }
}
