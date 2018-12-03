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
    let mySession, mappedSessions, accruedTime;

    let sessionTable = (
      <p>Get to work already! Hit Start Session to start timing your work.</p>
    );
    if (this.state.sessions.length > 0) {
      accruedTime = this.state.sessions.reduce((acc, element) => {
        return acc + element.duration;
      }, 0);

      mappedSessions = this.state.sessions.map((el, index) => {
        return (
          <tr key={el._id}>
            <td>{index + 1}</td>
            <td>{el.startTime}</td>
            <td>{el.endTime}</td>
            <td>{el.duration}</td>
            <td>{el.notes}</td>
            <td>Edit</td>
            <td>Del</td>


          </tr>
        );
      });
      sessionTable = (
        <table>
          <thead>
            <tr>
              <th>Session:</th>
              <th>StartTime</th>
              <th>EndTime</th>
              <th>Duration</th>
              <th>Notes</th>
              <th>Edit</th>
              <th>Delete</th>


            </tr>
          </thead>
          <tbody>{mappedSessions}</tbody>
        </table>
      );
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
              <textarea
                    type="text"
                    value={this.props.notes}
                    onChange={evt => this.props.handleInputChange('notes', evt.target.value)}
                    className="input"
                    placeholder="Notes: what did you do with your time?"
                    cols="30"
                    rows="10"
                />




              <button
                onClick={() => {
                  this.props.handleSessionClick("end");
                  this.setState({ isActive: false });
                  this._fetchSessions(this.props.project._id);
                }}
              >
                Call it a day!
              </button>
              <button
            onClick={() => {
              this.props.debug();
            }}
            >
              Debug
            </button>
            </div>
          </div>
        )}
        Accrued Project Time: {accruedTime}
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
