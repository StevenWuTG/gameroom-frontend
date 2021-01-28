import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {storePassword} from '../Redux/actions'
import styled from 'styled-components'

import TextField from '@material-ui/core/TextField';

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
        this.props.storePassword(this.state.password)
        // this.setState({finished:true})

        // return (<Redirect to="/welcome" />)
        
    }


    render() {
        return (
            <Wrapper class="login-box">

            Enter your credentials
            <br></br>
            <br></br>
            <form onSubmit = {this.submitHandler} >
            <div >
                
                <TextField type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.inputHandler} /> <br></br>
                <TextField type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.inputHandler}/> <br></br>
                <TextField type="text" name="avatar" placeholder="Avatar" value={this.state.avatar} onChange={this.inputHandler}/> <br></br>
                <TextField type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.inputHandler}/> <br></br>
                <TextField type="text" name="bio" placeholder="Quick Bio" value={this.state.bio} onChange={this.inputHandler}/> <br></br>
                
                <NewButton type="submit">Signup</NewButton>
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
            </Wrapper>
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

        storePassword: (password) => dispatch(storePassword(password))
    }
    
}

export default connect(msp,mdp)(Signup)

const NewButton = styled.button`
position:relative;
  width: auto;
  display:inline-block;
  color:#ecf0f1;
  text-decoration:none;
  border-radius:5px;
  border:solid 1px #f39c12;
  background:#e67e22;
  text-align:center;
  
  -webkit-transition: all 0.1s;
	-moz-transition: all 0.1s;
	transition: all 0.1s;
	
  -webkit-box-shadow: 0px 6px 0px #d35400;
  -moz-box-shadow: 0px 6px 0px #d35400;
  box-shadow: 0px 6px 0px #d35400;

  :active{
    -webkit-box-shadow: 0px 2px 0px #d35400;
    -moz-box-shadow: 0px 2px 0px #d35400;
    box-shadow: 0px 2px 0px #d35400;
    position:relative;
    top:4px;
}
`
const Wrapper = styled.div`
  
    height:100%;  
    width:100%;  
    border:2px solid black;
    flex-direction: column;
    display: column;
    justify-content: center;
    text-align:center;

`