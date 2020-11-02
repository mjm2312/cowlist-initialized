import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cows: [],
      spotlightCow: {}//null//{}
    }
    this.createCow = this.createCow.bind(this);
    //this.highlightCow = this.highlightCow.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/cows')
    .then( (cow) => {
      this.setState({cows: cow.data});
    })
    .catch((err) => {
      console.log('error fetching cows', err);
    })
  }

  createCow(cow) {
    var cowList = this.state.cows;
    cowList.push(cow);
    this.setState({cows: cowList});
  }

  highlightCow(cow) {
    this.setState({spotlightCow: cow});
  }

  


  render() {
    return (
    <div>
    <Focus cow = {this.state.spotlightCow}/>
    <CowList 
          cows = {this.state.cows}
          focusCow = {this.highlightCow.bind(this)}
    />
    Hello World!
    <Search createCow = {this.createCow} />
    </div> 
    );
  }
}

var Focus = ({cow}) => (
  !{cow} ? <div className = 'no highlight'> No cow selected</div> : 
  //<div className = 'highlight'>{cow.cows} : {cow.descriptions}</div> 
  <div className = 'highlight'>{cow.cows} : {cow.descriptions} </div>

)



var CowList = ({cows, focusCow}) => {
  console.log('focusCow in cowlist', focusCow);
  console.log(cows.length);
  cows.forEach((x) => {
    console.log('does for each works');
  }
  )

  cows.map((cow) => {
    console.log(cow.cows);
    console.log(cow.descriptions);
  })
  return (
  <div className="cowlist">
    {cows.map((cow) =>
      <CowListEntry
        cowName={cow.cows}
        cowDesc={cow.descriptions}
        focusCow = {focusCow}
      />
    )}
  </div>
  )
}

var CowListEntry = ({cowName, cowDesc, focusCow}) => {
  //<div>hi</div>
  //style = "display: inline-block, font-weight: bold"
  
  var cow = {cows: cowName, descriptions: cowDesc};
  return (
    <div> 
    <div onClick={() => focusCow(cow)}> {cowName} : </div>
    <div> {cowDesc} </div>
    </div>
  );
  }


class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
  
    axios.post('http://localhost:3000/api/cows', this.state.value)
    .then((response) => {
      console.log('line 101', response.config.data);
      
      var parsedCowString = this.state.value.split(';').reduce((pairs, pair) => {
        let index = pair.indexOf(':');
        let key = pair.slice(0, index);
        let value = pair.slice(index + 1);
        pairs[key] = value;
  
        return pairs;
      }, {})

      console.log('in axios .then', parsedCowString)
      this.props.createCow(parsedCowString)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return (
      <div className="search-bar form-inline">
        <input
          className="form-control"
          type="text"
          onChange = {this.handleChange}
          value={this.state.value}
        />
        <button className="input btn" onClick={this.handleSubmit}> Submit
          <span className="glyphicon glyphicon-search"></span>
        </button>
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App/>, mountNode);