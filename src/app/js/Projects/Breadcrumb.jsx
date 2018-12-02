import React, { Component } from "react";

class Breadcrumb extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const myProject = this.props.project;
    return (
      <div>
        {/* User: {this.props.user}  */}
        <p>Project: {myProject.title}</p>
        <p>_id: {myProject._id}</p>
        <p>Owner: {myProject.owner}</p>
      </div>
    );
  }
}

export default Breadcrumb;
