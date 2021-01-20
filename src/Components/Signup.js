import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

export class Signup extends Component {

    state = {
        username:"",
        password:"",
        email:"",
        avatar:"",
        bio:""
        
        // finished:null
    }

    inputHandler = (e) => {
        this.setState({[e.target.name]:e.target.value})
        console.log(e.target.value)
    }
    submitHandler = (e) => {
        e.preventDefault()
        console.log("onsubmit redux.logged_in",this.props.logged_in)
        this.props.submitHandler(this.state)
        // this.setState({finished:true})

        // return (<Redirect to="/welcome" />)
        
    }


    render() {
        return (
            <div class="login-box">

            Enter your credentials
            <br></br>
            <br></br>
            <form onSubmit = {this.submitHandler} >
            <div class="user-box">
                
                <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.inputHandler} /> <br></br>
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.inputHandler}/> <br></br>
                <input type="text" name="avatar" placeholder="Avatar" value={this.state.avatar} onChange={this.inputHandler}/> <br></br>
                <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.inputHandler}/> <br></br>
                <input type="text" name="bio" placeholder="Quick Bio" value={this.state.bio} onChange={this.inputHandler}/> <br></br>
                
                <input type="submit" value="Sign Up"/>
                </div>
            </form>

            { this.props.logged_in === true ? 
            
            <>
            <Redirect to="/profile"/>
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

export default connect(msp,mdp)(Signup)