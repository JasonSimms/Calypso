import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 45,
      isRunning: false
    };

    this._timerToggle = this._timerToggle.bind(this);
    this._countdown = this._countdown.bind(this);
  }

  render() {
    return (
      <div>
        Hello TIMER!
        {this.state.isRunning ? (
            <button onClick={() => this._timerToggle("pause")}>Pause</button>
        ) : (

          <button onClick={() => this._timerToggle("start")}>Start</button>
        )}
        {this.state.time < 45 && <button onClick={() => this._reset()}>Reset</button>}
        {this.state.time}
        <br />
        {this.state.isRunning.toString()}
      </div>
    );
  }

  _timerToggle(key) {
    this.setState(prevState => ({ isRunning: !prevState.isRunning }));
   if(key === "start" && !this.state.isRunning)this.timer = setInterval(() => this._countdown(), 500);
    else if (key === "pause") clearInterval(this.timer);
  }

  _countdown() {
    if (this.state.time > 0)this.setState(prevState => ({ time: prevState.time - 1 }));
    else {
        this._timerToggle('pause')
        alert(`Timer Done, time for a pause!`)
    }
  }

  _reset(){
      this.setState({time : 45})
  }
}
export default Timer;
