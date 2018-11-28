import React from "react";
import { Link } from "react-router-dom";

import api from '../utils/api'


class NewProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      error: ""
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._newProject = this._newProject.bind(this);
  }

  componentDidMount() {
    this._handleInputChange("title", "");
  }

  render() {
    return (
      <div className="container">
        <h1>Start A New Project</h1>
        <input
          type="title"
          value={this.state.title}
          onChange={evt => this._handleInputChange("title", evt.target.value)}
          className="input"
          placeholder="myProject"
        />
        <br />
        <br />
        <button className="button" onClick={() => this._newProject()}>
          Project Initiate!
        </button>
        <br />
        <br />
        <p>{this.props.error}</p>
        <div className="separator" />
        <Link className="link" to="/auth/sign-in">
          Did you already start a project? Continue an existing one!
        </Link>
      </div>
    );
  }

  _handleInputChange(key, newValue) {
    this.setState({
      [key]: newValue
    });
  }

  _newProject() {
    this.setState({
      error: "",
      title: ""
    });
    api
      .post(`/api/db/new-project`, {
        title: this.state.title,
        owner: this.props.userID
      })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        this.setState({
          error: err.description
        });
      });
  }
}

export default NewProject;
