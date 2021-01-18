import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

export class Login extends Component {

    state = {
        username:"",
        password:""
    }

    inputHandler = (e) => {
        this.setState({[e.target.name]:e.target.value})
        console.log(e.target.value)
    }
    
    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)
    }


    render() {
        return (
            <div class="login-box">
            <form onSubmit = {this.submitHandler}>
            <div class="user-box">
             <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.inputHandler} /> 
            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.inputHandler}/> 
            <input type="submit" value="Login"/>
            </div>
            </form>

            { this.props.logged_in === true ? 
            
            <>
            <Redirect to="/welcome"/>
            </>
            :
            <>
            </>
            }
            </div>
        )
    }
}

const msp = (state) => {
    return{ 
        logged_in: state.logged_in
    }

}

function mdp(dispatch){
    return{

    
    }
    
}

export default connect(msp,mdp)(Login)
