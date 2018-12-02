import React from "react";
import { stringify } from "querystring";
import { Link } from "react-router-dom";

const Home = props => {
  return (
    <div className="container">
      <h1>Hello, {props.user ? props.user.email : "Stranger"}!</h1>
      <Link className="link" to="/projects">
        Get Started!
      </Link>
      <p>Welcome to Project Calypso!</p>
      <p>Track the time of any task you want!</p>
      <p>Instructions:</p>
      <ol>
        <li>Register or Login</li>
        <li>
          Create a Project or Select a previous one.
          <br />
          ::hint:: No user can have two of the same project title{" "}
        </li>
        <li>
          Hit "Start A Session" and all of your time at the desk will be
          documented!
          <br />
          ***But dont forget to finish your Session.
          <br />
          ***The IoT does not yet have sensor in your chair...or does it?
        </li>
      </ol>
    </div>
  );
};

export default Home;
