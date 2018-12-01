import React, { Component } from "react";
import api from "../utils/api";


class SessionDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      sessions: null
    };
    this._fetchSessions = this._fetchSessions.bind(this)
  }

  componentDidMount(){
      this._fetchSessions(this.props.project._id);
  }

  render() {
    console.log(this.props);
    console.log(this.state.sessions,`***********`)
    let mySession, mappedSessions;


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
        {mappedSessions}
      </div>
    );
  }

  _fetchSessions(projectID){
    api
    .get(`/api/db/fetch-sessions/${projectID}`, (req, res) => {
      null;
    })
    .then(data => {
      this.setState({ sessions: data });
    })
    .catch(err => {
      this.setState({
        error: err.description
      });
    });
  }
}

export default SessionDisplay;
