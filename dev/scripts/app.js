import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
import index from 'axios';

// api key: c17bad791422b42a39a8f8e4299b6c53

// main App component
// set initial state in here 
// and bind functions
class App extends React.Component {
  constructor() {
    super();
    // this refers to app
    // grabbing 
    this.state = {
      timezone: "",
      temperature: "",
      summary: "",
      icons: "",
    };

    // bind here

  }

  // here is anything we want to happen after the component renders
  componentDidMount() {
    // const dbref = firebase.database().ref("/eggsLaid");

    axios({
      url: "https://proxy.hackeryou.com",
      params: {
        reqUrl: "https://api.darksky.net/forecast/c17bad791422b42a39a8f8e4299b6c53/43.6532,-79.3832?si=temperature"
      },
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      }
    })

      // promise
      .then((res) => {
        this.setState({
          timezone: res.data.timezone,
          temperature: res.data.currently.temperature,
          summary: res.data.currently.summary,
          icon: res.data.currently.icon
          // eggInput: ""
        });

        // skycons
        let icons = new Skycons({
          'color': "yellow"
        }),
          list = [
            "clear-day", "clear-night", "partly-cloudy-day",
            "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
            "fog"
          ],
          i;

        for (i = list.length; i--;)
          icons.set(list[i], list[i]);

        icons.play();
      });

  }


  // everything that gets displayed on page goes here
  render() {
    return (
      <div className="wrapper">
          <h2 className="timeZone">{this.state.timezone}</h2>
          <p className="weatherSummary">{this.state.summary}</p>
          <div>
            <div className="tempIconFlex">
              <canvas className="flexIcon" id={this.state.icon} width="100" height="100"></canvas>
              <p className="flexTemp">{this.state.temperature}<span className="celcius">℃</span></p>
            </div>
            {/* <div className="icon">
              <EggIcon />
            </div> */}
          </div>

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


// pseudo code

// weather API:
// using axios make get request and pass URI argument
// pass results in a promise 

// Calendar:
// calendar from github

// User Input:
// beside weather API results
// user is asked for authentication
// user can input how many eggs were layed by their chickens
// return this input to user 

// store user input in firebase 
// return information in calendar 
// store weather information in calendar


// state for user input 
// on submit take all info and push to firebase
