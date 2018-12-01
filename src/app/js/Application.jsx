import React from 'react'
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import Auth from './Auth'
import Home from './Home'
import Navigation from './Navigation'
import Profile from './Profile'
import NotFound from './NotFound'
import api from './utils/api'
import Timer from './Timer'
import NewProject from './Projects/NewProject'


class Application extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: this._setUser(true),
        }

        this._setUser = this._setUser.bind(this)
        this._resetUser = this._resetUser.bind(this)
    }

    componentDidMount() {
        this._setUser()
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navigation user={this.state.user} />
                    <Timer />
                    {this.state.user ? <NewProject userID={this.state.user._id} /> : null}
                    <Switch>
                        <Route exact path="/" render={() => <Home user={this.state.user} />} />
                        <Route exact path="/profile" render={() => <Profile user={this.state.user} />} />
                        <Route
                            path="/auth"
                            render={() => <Auth setUser={this._setUser} resetUser={this._resetUser} />}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }

    _resetUser() {
        this.setState({
            user: null,
        })
    }

    _setUser(init) {
        const token = localStorage.getItem('identity')
        const activeSession = localStorage.getItem('activeSession')
        if (token) {
            const decoded = jwtDecode(token)
            delete decoded.iat
            if (init) return decoded
            console.log(decoded)
            this.setState({ user: decoded })
            if(activeSession)console.log(`You have an active session!`)
        } else {
            return null
        }
    }

}

export default Application
