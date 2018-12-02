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


    let sessionTable = <p>Get to work already! Hit Start Session to start timing your work.</p>;
    if (this.state.sessions.length > 0){
     

      mappedSessions = this.state.sessions.map((el, index) => {
        return (
          <tr key={el._id}>
            <td>{index+1}</td>
            <td>{el.startTime}</td>
            <td>{el.endTime}</td>
            <td>{el.duration}</td>
          </tr>
        );
      });
      sessionTable = (
        <table>
          <tr>
            <th>Session:</th>
            <th>StartTime</th>
            <th>EndTime</th>
            <th>Duration</th>
          </tr>
          {mappedSessions}
        </table>
      )
    }

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
          <div className="popup">
            <div className="popup_inner">
              <h4>You have an active Session! do not hit refresh please.</h4>
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
          </div>
        )}
        {sessionTable}
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
