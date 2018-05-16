import React, { Component } from 'react';
// import * as d3 from "d3";
// import InfluenceNetwork from '../modules/InfluenceNetwork'

class InfluenceVisualizationContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: []
    }

  }

  componentDidMount() {
      fetch(`/api/v1/influences`)
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
                error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(response => response.json())
        .then(data => {
          this.setState({ data: data });
          InfluenceNetwork(data)
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {



    return(

      <div id="chart"> This </div>


    )

  }
}

export default InfluenceVisualizationContainer;
