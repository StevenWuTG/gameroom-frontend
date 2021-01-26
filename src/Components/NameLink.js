import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavLink} from "react-router-dom"
import {reduxShowUser} from "../Redux/actions"

export class NameLink extends Component {
    componentDidMount(){

        console.log(this.props)
    }
    

    showUser = () => {
        // e.preventDefault()

        // let user = 
        console.log(this.props)
        this.props.reduxShowUser(this.props.linkUser.id)
        return

    }
    render() {
        return (
            <div>
                -
                <NavLink to="/showuser">
                    <div onClick={this.showUser}>
                        {this.props.linkUser.username}
                    </div>
                </NavLink>
                
            </div>
        )
    }
}

const msp = (state) => {
    return {
        // articleObj: state.article,
        // userObj: state.user
    }
}

function mdp(dispatch){
    return{
        reduxShowUser: (userId) => dispatch(reduxShowUser(userId)) 
        
    
    }
    
}

export default connect(msp,mdp)(NameLink)
