import React from "react";
import { Link } from "react-router-dom";

import api from "../utils/api";
import SessionDisplay from "./SessionDisplay";

class ProjectsControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      error: "",
      projects: null,
      activeProject: null,
      activeSession: null
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._newProject = this._newProject.bind(this);
    this._fetchProjects = this._fetchProjects.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
    this._selectProject = this._selectProject.bind(this);
    this._handleSessionClick = this._handleSessionClick.bind(this);
    this._handleLocalStorage = this._handleLocalStorage.bind(this);
  }

  componentDidMount() {
    this._handleInputChange("title", "");
    this._fetchProjects();
  }

  render() {
    let projectHeader;
    this.state.activeProject
      ? (projectHeader = (
          <div>
            <p>Active Project: {this.state.activeProject.title}</p>
            <p>ActiveProject.id: {this.state.activeProject._id}</p>
            {this.state.activeSession && <p>Active Session._id:{this.state.activeSession._id}</p>}
            <button
              onClick={() => {
                this.setState({ activeProject: null });
              }}
            >
              Change Project
            </button>
            <button
              onClick={() => {
                console.log(window.localStorage.getItem("activeSession"));
              }}
            >
              Debug: Get Local storage?
            </button>

            <SessionDisplay
              project={this.state.activeProject}
              session={this.state.activeSession}
              handleSessionClick={this._handleSessionClick}
            />
          </div>
        ))
      : (projectHeader = null);

    let projects = this.state.projects;
    let mappedProjects;
    if (projects !== null) {
      mappedProjects = projects.map(el => {
        return (
          <li key={el.title}>
            {el.title}
            <button
              onClick={() => {
                this._selectProject(el._id);
              }}
            >
              Select This ONe: {el._id}
            </button>
            <button
              onClick={() => {
                this._deleteItem(`Project`, el._id);
              }}
            >
              Delete this Project
            </button>
          </li>
        );
      });
    }
    return (
      <div className="container">
        {this.state.activeProject ? (
          projectHeader
        ) : (
          <div>
            <h1>Start A New Project</h1>
            <input
              type="title"
              value={this.state.title}
              onChange={evt =>
                this._handleInputChange("title", evt.target.value)
              }
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
            <button onClick={() => this._fetchProjects()}>
              fetch projects
            </button>
            {this.state.projects && <ol>{mappedProjects}</ol>}
            <p>{this.props.error}</p>
            <div className="separator" />
            <Link className="link" to="/auth/sign-in">
              Did you already start a project? Continue an existing one!
            </Link>
          </div>
        )}
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
        this.setState({ projects: [...this.state.projects, data] });
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

  _deleteItem(key, id) {
    if (confirm(`Delete this Project and all records!?!`)) {
      console.log(`deleting a`, key, `id:`, id);
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
          console.log(data);
        })
        .then(results => this._fetchProjects())
        .catch(err => {
          this.setState({
            error: err.description
          });
        });
    } else {
      console.log(`Deletion Aborted`);
    }
  }

  _handleLocalStorage(key) {
    if (key !== "clear")
      window.localStorage.setItem("activeSession", 'true');
    else window.localStorage.removeItem("activeSession");
  }

  _selectProject(projectID) {
    let activeProject = this.state.projects.find(obj => obj._id == projectID);
    this.setState({ activeProject });
  }

  _handleSessionClick(key) {
    if (key === "start") {
      api
        .post(`/api/db/new-session`, {
          project: this.state.activeProject._id,
          user: this.props.userID
        })
        .then(result => {
          this.setState({ activeSession: result })
          this._handleLocalStorage("start")
        })
        .catch(err => {
          console.log(err);
        })
    } else if (key === "end") {
      api
        .post(`/api/db/end-session`, {
          id: this.state.activeSession._id,
          notes: this.state.notes
        })
        .then(this._handleLocalStorage("clear"))
        .then(result => this.setState({ activeSession: null }))
        .catch(err => {
          console.log(err);
        });
    }
  }

 
}

export default ProjectsControls;
