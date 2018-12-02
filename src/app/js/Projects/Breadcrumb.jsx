import React, { Component } from 'react';

class Breadcrumb extends Component {
    constructor(props) {
        super(props);
      }
    render() {
        return (
            <div>
                User: {this.props.user} Project: {this.props.project} Sessions: {this.props.session}
            </div>
        );
    }
}

export default Breadcrumb;