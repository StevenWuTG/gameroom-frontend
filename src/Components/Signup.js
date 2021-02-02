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
             <div className="login">
                <div className="login-message">
                    <h1>Signup Form </h1>
                </div>
                
                <form className="login-form" onSubmit={this.submitHandler}>

                    <div className="control-group">
                        <input className="login-field" type="text" name="username" placeholder="username" value={this.state.username} onChange={this.inputHandler} ></input>
                    </div>

                    <div className="control-group">
                        <input type="password" class="login-field"  name="password" placeholder="password" value={this.state.password} onChange={this.inputHandler}></input>   
                    </div>
                    <div className="control-group">
                        <input type="text" name="email" placeholder="email" value={this.state.email} onChange={this.inputHandler}></input>   
                    </div>
                    

                    <button class="btn btn-primary btn-large btn-block" href="#">signup</button>

                </form>
                <br></br>
                <br></br>

            </div>

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
  
flex-direction: column;
display: flex;
text-align: center;
height: 100%;
width:100%;

background-position: 0px 0px;
width: 100%;
height: 100%;
background: url(http://i.imgur.com/7RaHlPr.gif), url(http://i.imgur.com/IN5uXk1.gif);
padding: 5px;
box-sizing: border-box;

  -moz-animation: animatedBackground 4s linear infinite;
  -webkit-animation: animatedBackground 4s linear infinite;
  -ms-animation: animatedBackground 4s linear infinite;
  -o-animation: animatedBackground 4s linear infinite;
animation: animatedBackground 6s linear infinite;
@keyframes animatedBackground {
  0% { background-position: 0 0, 0 0; rotate: 0deg;}
  100% { background-position: 300px -100px, 600px -100px;}
}
@-moz-keyframes animatedBackground {
  0% { background-position: 0 0, 0 0; }
  100% { background-position: -300px 100px, -600px 100px; }
}
@-webkit-keyframes animatedBackground {
  0% { background-position: 0 0, 0 0; }
  100% { background-position: -300px 100px, -600px 100px; }
}
@-ms-keyframes animatedBackground {
  0% { background-position: 0 0, 0 0; }
  100% { background-position: -300px 100px, -600px 100px; }
}
@-o-keyframes animatedBackground {
  0% { background-position: 0 0, 0 0; }
  100% { background-position: -300px 100px, -600px 100px; }
}

`