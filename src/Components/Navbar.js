import React, { Component } from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { reduxLogout } from '../Redux/actions'

export class Navbar extends Component {

    state={
        clicked:null
    }

    logout = () => {
        
        console.log(localStorage.clear())
        localStorage.clear("token")
        this.props.reduxLogout()
        this.setState({clicked:true})

        

        

    }

   
   

    render() {
        return (
            <>
            {this.props.logged_in? 
            <>
            <NavLink to="/welcome">
                <button>Welcome</button>
            </NavLink>
            <NavLink to="/articles">
                <button>Articles</button>
            </NavLink>
            <NavLink to="/games">
                <button>Games</button>
            </NavLink>
            <NavLink to="/Profile">
                <button>Profile</button>
            </NavLink>
            <button className="navbar-buttons" onClick= {this.logout}>Logout</button>
            </>
            :
            <>

            <NavLink to="/articles">
                <button>Articles</button>
            </NavLink>
            <NavLink to="/games">
                <button>Games</button>
            </NavLink>
            <NavLink to="/welcome">
                <button>Welcome</button>
            </NavLink>
            <NavLink to="/signup">
                <button>Signup</button>
            </NavLink>
            <NavLink to="/login">
                <button>Login</button>
            </NavLink>
            { this.props.logged_in === false ? 
            
            <>
            <Redirect to="/welcome"/>
            </>
            :
            <>
            </>
            }
            </>
            }
                
            </>
        )
    }
}

const msp = (state) => {
    return{ 
        userObj: state.user,
        logged_in: state.logged_in
    }

}

function mdp(dispatch){
    return{
        reduxLogout: () => dispatch(reduxLogout())
    
    }
    
}


export default connect(msp,mdp)(Navbar)
