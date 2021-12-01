import { Line } from "react-chartjs-2";
import { useState } from "react";
import Select from "react-dropdown-select";
import { Link } from "react-router-dom";
// in order for return to work, need labelArr = the state and crime in array,
// char data needs to be year: value, value being number of arrests
const LineGraph = ({ charData, labelArr, handleGraphSubmit }) => {
  var randomColor = require("randomcolor");
  const [stateSelected, setStateSelected] = useState("");
  const [crimeSelected, setCrimeSelected] = useState("");

  //  states should be names not abbv
  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "DE",
    "CT",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "VT",
    "UT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];
  const crimesAvailable = [
    {
      value: "drug-possession-marijuana",
      label: "Drug Possesion - (Marijuana)",
    },
    { value: "drug-possession-opium", label: "Drug Possession - (Opium)" },
    {
      value: "drug-possession-syntheitc",
      label: "Drug Possession - (Synthetic)",
    },
    { value: "drug-possession-other", label: "Drug Possession - (Other)" },
    { value: "drug-sales-marijuana", label: "Drug Sales - (Marijuana)" },
    { value: "drug-sales-opium", label: "Drug Sales - (Opium)" },
    { value: "drug-sales-synthetic", label: "Drug Sales - (Synthetic)" },
    { value: "drug-sales-other", label: "Drug Sales - (Other)" },
  ];
  const statesAvailable = states.map((abbv, i) => {
    return { value: `${i + 1}`, label: `${abbv}` };
  });

  // need to develop selection options from here. want home to route to here
  //  user state helper function needed for "save" functionality
  // should display user info somewhere on the page
  // console.log(dataStructure);

  const datasetsArr = charData.map((dataset, i) => {
    console.log(labelArr);
    let label = "";
    if (labelArr[i]) {
      label = JSON.stringify(labelArr[i])
        .replace(/['"]+/g, "")
        .replace(/\b(\w)/g, (s) => s.toUpperCase())
        .replace(/[{}]+/g, "");
    }

    return {
      data: dataset,
      label: label,
      fill: false,
      backgroundColor: randomColor(),
      borderColor: randomColor(),
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
    };
  });

  const chartDataConfig = {
    labels: Object.keys(charData),

    datasets: datasetsArr,
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            beginAt: "1995",
          },
        },
      ],
    },
  };
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3001/crimes/data/${stateSelected}/${crimeSelected}`)
      .then((res) => res.json())
      .then((res) => handleGraphSubmit(res));

    setStateSelected("");
    setCrimeSelected("");
  }
  return (
    <>
      <div id="lineForm">
        <form onSubmit={handleSubmit}>
          <Select
            className="states"
            options={statesAvailable}
            value={stateSelected}
            onChange={(e) => setStateSelected(e.map((val) => val.value))}
          />
          <Select
            className="crimes"
            options={crimesAvailable}
            value={crimeSelected}
            onChange={(e) => setCrimeSelected(e.map((val) => val.value))}
          />
          <input type="submit" value="Get The Graph" />
        </form>
      </div>
      <div id="Graph">
        <Line data={chartDataConfig} option={options} />
      </div>
      <br></br>
      <Link to="/">Go to Home Page</Link>
    </>
  );
};
export default LineGraph;
