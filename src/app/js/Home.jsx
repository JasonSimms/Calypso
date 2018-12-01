import React from 'react'
import { stringify } from 'querystring';
import { Link } from 'react-router-dom'


const Home = props => {
    return (
        <div className="container">
            <h1>Hello, {props.user ? props.user.email: 'Stranger'}!</h1>
            <Link className="link" to="/projects">
                    Get Started
                </Link>
        </div>
    )
}

export default Home
