import React, { Component } from "react";
import api from "../utils/api";

class SessionDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      isLoaded: false,
      sessions: false
    };
    this._fetchSessions = this._fetchSessions.bind(this);
  }

  componentDidMount() {
    this._fetchSessions(this.props.project._id);
  }

  render() {
    let mySession, mappedSessions;

    mappedSessions = <p>some sessions</p>;
    if (this.state.isLoaded) console.log(`sessions`, this.state.sessions);

    if (this.props.session) mySession = this.props.session.id;
    return (
      <div>
        {!this.state.isActive ? (
          <button
            onClick={() => {
              this.props.handleSessionClick("start");
              this.setState({ isActive: true });
            }}
          >
            Start a session!
          </button>
        ) : (
          <div>
            wtf
            <button
              onClick={() => {
                this.props.handleSessionClick("end");
                this.setState({ isActive: false });
              }}
            >
              Call it a day!
            </button>
          </div>
        )}
        <p>I got your sessions right here...</p>
        {this.state.sessions && this.state.sessions.length}
        {mappedSessions}
      </div>
    );
  }

  _fetchSessions(projectID) {
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
