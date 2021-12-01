import React, { Component } from "react";
import { USAMap } from "react-usa-map";

import { useHistory } from "react-router-dom";

function Map() {
  const history = useHistory();
  /* mandatory */
  const mapHandler = (event) => {
    alert(event.target.dataset.name);
    history.push(`/Demographic/${event.target.dataset.name}`);
  };

  return (
    <div className="App">
      <h1>C & C</h1>
      <h3>Census and Crime Data</h3>
      <p>
        *Please select the state you would like to see information for. Not all
        states fully report crime data. This can lead to disparities in the
        percentages. Please got to the FBI CrimeData website to see reporting
        amounts per state.*
      </p>
      <USAMap
        //   customize={this.statesCustomConfig()}
        width="650"
        height="420"
        onClick={mapHandler}
      />
    </div>
  );
}

export default Map;
