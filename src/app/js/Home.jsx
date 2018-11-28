import React from 'react'
import { stringify } from 'querystring';

const Home = props => {
    return (
        <div className="container">
            <h1>Hello, {props.user ? props.user._id: 'Stranger'}!</h1>
        </div>
    )
}

export default Home
