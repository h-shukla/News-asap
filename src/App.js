import React, { Component } from 'react';
import Navbar from './components/Navbar.js';
import News from './components/News.js';

// required for routing
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

export default class App extends Component {
    pagesize = 12;
    apikey = process.env.REACT_APP_NEWS_API;

    render() {
	return (
	    <div>
	      <Router>
		<Navbar />
		<Switch>
		  <Route exact path="/"><News key="general" pageSize={this.pagesize} country="in" category="general" apikey={this.apikey} /></Route>
		  <Route exact path="/business"><News key="business" pageSize={this.pagesize} country="in" category="business" apikey={this.apikey} /></Route>
		  <Route exact path="/entertainment"><News key="entertainment" pageSize={this.pagesize} country="in" category="entertainment" apikey={this.apikey} /></Route>
		  <Route exact path="/health"><News key="health" pageSize={this.pagesize} country="in" category="health" apikey={this.apikey} /></Route>
		  <Route exact path="/science"><News key="science" pageSize={this.pagesize} country="in" category="science" apikey={this.apikey} /></Route>
		  <Route exact path="/sports"><News key="sports" pageSize={this.pagesize} country="in" category="sports" apikey={this.apikey} /></Route>
		  <Route exact path="/technology"><News key="technology" pageSize={this.pagesize} country="in" category="technology" apikey={this.apikey} /></Route>
		</Switch>
	      </Router>
	    </div>
	);
    }
}

// wrap everything into router tag
// wrap everything that will change into switch tag
