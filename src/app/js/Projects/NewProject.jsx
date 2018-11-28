import React from "react";
import { Link } from "react-router-dom";

import api from "../utils/api";

class NewProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      error: "",
      projects: null,
      activeProject: null,
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._newProject = this._newProject.bind(this);
    this._fetchProjects = this._fetchProjects.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
  }

  componentDidMount() {
    this._handleInputChange("title", "");
    // this._fetchProjects();
  }

  render() {
    let projects = this.state.projects;
    let mappedProjects;
    if (projects !== null) {
      mappedProjects = projects.map(el => {
        return <li key={el.title}>{el.title}>
        <button onClick={()=>{this.setState({activeProject: el._id})}}>Select This ONe!</button>
        <button onClick={()=>{this._deleteItem(`Project`,el._id)}}>Delete this Project</button>
        </li>;
      });
    }
    return (
      <div className="container">
      <h1>Active Project: {this.state.activeProject}</h1>
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
        <button onClick={() => this._fetchProjects()}>fetch projects</button>
        {this.state.projects && <ol>{mappedProjects}</ol>}
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
        this.setState({ projects: [...this.state.projects, data] })
      })
      .catch(err => {
        this.setState({
          error: err.description
        });
      });
  }

  _resetUser() {
    this.setState({
      user: null
    });
  }

  _fetchProjects() {
    console.log(`fetching projects for:`, this.props.userID);
    api
      .get(`/api/db/fetch-projects/${this.props.userID}`, (req, res) => {
        null;
      })
      .then(data => {
        this.setState({ projects: data });
      })
      .catch(err => {
        this.setState({
          error: err.description
        });
      });
  }

  _deleteItem(key,id){
    if (confirm(`Delete this Project and all records!?!`)) {
      console.log(`deleting a`,key,`id:`,id);
      this.setState({
        error: "",
        title: ""
      });
      api
        .post(`/api/db/deletebyId`, {
          key,
          owner: this.props.userID,
          id
        })
        .then(data => {
          console.log(data)
        }).then(results => this._fetchProjects()
        )
        .catch(err => {
          this.setState({
            error: err.description
          });
        });
  } else {
      console.log(`Deletion Aborted`);
  }
      
  }
}

export default NewProject;
