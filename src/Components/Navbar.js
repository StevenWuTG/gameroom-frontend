import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export class Navbar extends Component {
    render() {
        return (
            <>
            <NavLink to="/articles">
                <button>Articles</button>
            </NavLink>
            <NavLink to="/welcome">
                <button>Welcome</button>
            </NavLink>
            <NavLink to="/Profile">
                <button>Profile</button>
            </NavLink>
            <NavLink to="/signup">
                <button>Signup</button>
            </NavLink>
            <NavLink to="/login">
                <button>Login</button>
            </NavLink>
            </>
        )
    }
}

export default Navbar
