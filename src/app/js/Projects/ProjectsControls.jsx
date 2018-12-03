import React from "react";
import { Link } from "react-router-dom";

import api from "../utils/api";
import SessionDisplay from "./SessionDisplay";
import Breadcrumb from "./Breadcrumb";

class ProjectsControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      error: "",
      projects: null,
      activeProject: null,
      activeSession: null,
      activeDetails: null,
      activeEdit: null,
      notes: ""
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._newProject = this._newProject.bind(this);
    this._fetchProjects = this._fetchProjects.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
    this._selectProject = this._selectProject.bind(this);
    this._handleSessionClick = this._handleSessionClick.bind(this);
    this._handleLocalStorage = this._handleLocalStorage.bind(this);
    this._editProject = this._editProject.bind(this);
    this._debug = this._debug.bind(this);
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
            {this.state.activeSession && (
              <p>Active Session._id:{this.state.activeSession._id}</p>
            )}
            <button
              onClick={() => {
                this.setState({ activeProject: null });
              }}
            >
              Change Project
            </button>
            <button
              onClick={() => {
                this._editProject(this.state.activeProject._id);
              }}
            >
              Edit This Project
            </button>
           
            <br />
            <br />
            {/* <button
              onClick={() => {
                console.log(window.localStorage.getItem("activeSession"));
              }}
            >
              Debug: Get Local storage?
            </button> */}

            <SessionDisplay
              project={this.state.activeProject}
              session={this.state.activeSession}
              handleSessionClick={this._handleSessionClick}
              notes={this.state.notes}
              handleInputChange={this._handleInputChange}
              debug={this._debug}
            />
          </div>
        ))
      : (projectHeader = null);

    let projects = this.state.projects;
    let mappedProjects;
    if (projects !== null) {
      mappedProjects = projects.map(el => {
        return (
          <li key={el.title} className="project">
              
            <button
              className="select-project"
              onClick={() => {
                this._selectProject(el._id);
              }}
            >
              Select
            </button>
            {el.title}
            <button
              className="delete-project"
              onClick={() => {
                this._deleteItem(`Project`, el._id);
              }}
            >
              Delete
            </button>
          </li>
        );
      });
    }
    return (
      <div className="container">
        {this.state.activeProject ? (
          <div className="project-details">
            <Breadcrumb
              user={this.props.user.email}
              project={this.state.activeProject}
              // deleteProject={this._deleteItem}
            />
            {projectHeader}
          </div>
        ) : (
          <div>
            <div className="flex">
              {/* <h3>Start A New Project: </h3> */}
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
                Initiate a new project!
              </button>
              <br />
              <br />
            </div>
            <button
              className="button refresh"
              onClick={() => this._fetchProjects()}
            >
              Refresh Project List
            </button>
            <h4>Your projects:</h4>
            <div className="project-list">
              {this.state.projects && <ol>{mappedProjects}</ol>}
            </div>
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
    if (key !== "clear") window.localStorage.setItem("activeSession", "true");
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
          this.setState({ activeSession: result });
        })
        .catch(err => {
          console.log(err);
        });
    } else if (key === "end") {
      api
        .post(`/api/db/end-session`, {
          id: this.state.activeSession._id,
          notes: this.state.notes,
          start: this.state.activeSession.startTime
        })
        .then(this._handleLocalStorage("clear"))
        .then(result => this.setState({ activeSession: null, notes: null }))
        .catch(err => {
          console.log(err);
        });
    }
  }

  _editProject(id) {
    console.log(`Edit this shit already`, id);
  }

  _debug(){
    console.log(`Debug:`,this.state.activeSession)
    api.post('/api/db/debug',{
      session: this.state.activeSession._id,
      user: this.state.activeSession.user
    }).then(data => console.log(data))
  }
}

export default ProjectsControls;
