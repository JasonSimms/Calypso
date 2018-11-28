import React, { Component } from "react";

class SessionDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };
  }

  render() {
    console.log(this.props);
    let mySession;
    if (this.props.session) mySession = this.props.session.id;
    return (
      <div>
        I got your sessions right here...
        {!this.state.isActive ? <button
            onClick={() => {
              this.props.handleSessionClick("start");
              this.setState({isActive: true})
            }}
          >
            Start a session!
          </button>
         : 
         <div>
             wtf
          <button
            onClick={() => {
              this.props.handleSessionClick("end");
              this.setState({isActive: false})
            }}
          >
            Call it a day!
          </button>
          </div>
        }
      </div>
    );
  }
}

export default SessionDisplay;
