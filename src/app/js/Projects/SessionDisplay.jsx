import React, { Component } from "react";
import api from "../utils/api";

class SessionDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      isLoaded: false,
      sessions: []
    };
    this._fetchSessions = this._fetchSessions.bind(this);
  }

  componentDidMount() {
    this._fetchSessions(this.props.project._id);
  }

  render() {
    let mySession, mappedSessions;

    mappedSessions = <p>some sessions</p>;
    if (this.state.sessions.length > 0)
      mappedSessions = this.state.sessions.map(el => {
        return (
          <li>
            Start: {el.startTime} End:{el.endTime}
          </li>
        );
      });

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
            <button
              onClick={() => {
                this.props.handleSessionClick("end");
                this.setState({ isActive: false });
                this._fetchSessions(this.props.project._id);
              }}
            >
              Call it a day!
            </button>
          </div>
        )}
        <p>I got your sessions right here...</p>
        <ol>{mappedSessions}</ol>
      </div>
    );
  }

  _fetchSessions(projectID) {
    api
      .get(`/api/db/fetch-sessions/${projectID}`)
      .then(data => {
        this.setState({ sessions: data });
        // console.log(data)
      })
      .catch(err => {
        this.setState({
          error: err.description
        });
      });
  }
}

export default SessionDisplay;
