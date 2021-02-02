import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updateShowArticle , storePassword} from '../Redux/actions'
import styled from "styled-components"
import TextField from '@material-ui/core/TextField';
import '../Css/Login.css';



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
        // console.log("unsafe storage", this.state.password)
        this.props.storePassword(this.state.password)
    }


    render() {
        return (
            <Wrapper2>
                
            

            <div className="login">
                <div className="login-message">
                    <h1>Please login </h1>
                </div>
                
                <form className="login-form" onSubmit={this.submitHandler}>

                    <div className="control-group">
                        
                        <input className="login-field" type="text" name="username" placeholder="username" value={this.state.username} onChange={this.inputHandler} ></input>
                    </div>

                    <div className="control-group">
                        
                        <input type="password" class="login-field"  name="password" placeholder="password" value={this.state.password} onChange={this.inputHandler}></input>   
                    </div>

                    <button class="btn btn-primary btn-large btn-block" href="#">login</button>

                </form>

            </div>

            

            { this.props.logged_in === true ? 
            
            <>
            <Redirect to="/profile"/>
            </>
            :
            <>
            </>
            }
            </Wrapper2>
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

export default connect(msp,mdp)(Login)


const LoginForm = styled.div`

    margin: 30px auto;
    width: 300px;
    height: 300px;

`

const Wrapper = styled.div`
  
  flex-direction: column;
  display: flex;
  text-align: center;
  height: 100%;
  width:100%;

`
const Wrapper2 = styled.div`
  
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