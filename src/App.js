import React, { Component } from 'react';
import './App.css'; //actualy adds styles

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 8,
            angle: 45
        };
    }
    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value});
    }
    size() {
        //return 200/this.state.height*1.2+15;
        return 490/170;
    }
    cv() {
        const height = this.state.height;
        const angle = this.state.angle;
        const drc = 0.0174532925; // degree to radian constant
        const angleRad = drc * angle; // radius angle in radian
        const angleBrad = ((180 - angle) / 2) * drc; //reversed angle in radian

        const radius = Math.round(height / (2 * (Math.sin(angleRad / 2) * Math.sin(angleRad / 2))) * 100) / 100;
        const length = (height / Math.sin(angleRad / 2)).toFixed(2);
        const foot = (height * Math.tan(angleBrad)).toFixed(2);
        const depth = (radius - radius * Math.sin((90 - angle / 2) * drc)).toFixed(2);

        const carr = {radius, length, foot, deepth: depth};
        return carr;
    }
    render() {
        //const someStyles = {width: 600};
        const greentTextStyle = {color: 'green'};
        const heightStyle = {color: 'blue'};
        const footStyle = {color: 'purple'};
        const radiusStyle = {color: 'orange'};
        const printStyles = {transform: 'rotate(180deg)'};
        const rectStyles = {
            fill: "lightgrey",
            strokeWidth: 3,
            stroke: "none"
        };
        const deepthStyle = {color: 'grey'};
        const size = this.size();
        const height = this.state.height * size;
        const foot = this.cv().foot * size;
        const radius = this.cv().radius * size;
        return (
          <div className="App">

            <div className='central'>

              <div className="experiments"  style={printStyles}>
                <svg viewBox={"0 0 500 500"} height='500' width="500" preserveAspectRatio="xMidYMid meet">
                  <rect width={foot} height={height} style={rectStyles} />
                  <line id="newHeight" x1="0" y1="0" x2="0" y2={height} strokeWidth="8" stroke="blue"/>
                  <line id="newFoot" x1="0" y1="0" x2={foot} y2="0" strokeWidth="8" stroke="purple"/>
                  <path d={"M" + foot + "," + radius + " v-" + radius + " A" + radius + "," + radius + " 0 0,0 0," + height + " z"} fill="white" stroke="black" strokeWidth="3"/>
                  <line id="newLength" x1="0" y1={height} x2={foot} y2="0" strokeWidth="2" stroke="green"/>
                  <line id="redRadius" x1={foot} y1="0" x2={foot} y2={radius} stroke="orange" strokeWidth="3"/>
                  <line id="redRadius" x1="0" y1={height} x2={foot} y2={radius} stroke="orange" strokeWidth="3"/>
                  Sorry, your browser does not support inline SVG.
                </svg>
              </div>

              <div className="displayValues">
                <div style={radiusStyle}>radius<br/> {this.cv().radius}"</div>
                <div style={greentTextStyle}>length<br/> {this.cv().length}"</div>
                <div style={footStyle}>foot<br/> {this.cv().foot}"</div>
                <div style={deepthStyle}>depth<br/> {this.cv().deepth}"</div>
              </div>

              <div className="inputs">
                <span className="numbers">ANGLE</span>
                <input name="angle" className="numbers" type="range" min="25" max="90" step="1" onChange={this.handleChange.bind(this)} value={this.state.angle}/>
                <span className="numbers">{this.state.angle}&#176;</span>
              </div>

              <div className="inputs" style={heightStyle}>
                <span className="numbers">HEIGHT</span>
                <input  name="height" type="range" min="6" max="48" step="0.125" onChange={this.handleChange.bind(this)} value={this.state.height}/>
                <span className="numbers">{this.state.height}"</span>
              </div>

            </div>

          </div>
        );
    }
}

export default App;
