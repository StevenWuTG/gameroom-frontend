import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updateShowArticle , storePassword} from '../Redux/actions'
import styled from "styled-components"

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
            <Wrapper>
                Please Sign in
                <br></br>
                <br></br>
            <form onSubmit = {this.submitHandler}>
            <div class="user-box">
            <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.inputHandler} /> 
            <br></br>
            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.inputHandler}/>
            <br></br> 
            <NewButton type="submit">
                Login
            </NewButton>
            
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

export default connect(msp,mdp)(Login)

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
    text-align:center;
    object-fit:contain
`
