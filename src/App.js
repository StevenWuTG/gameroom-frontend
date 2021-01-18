import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import './Css/App.css';

import Header from './Containers/Header'
import Footer from './Containers/Footer'
import Articles from './Containers/Articles'
import Profile from './Containers/Profile'

import Navbar from './Components/Navbar'
import Welcome from './Components/Welcome'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { connect } from 'react-redux'

import { loginUser, signupUser, returningUser} from './Redux/actions'

export class App extends Component {

  reduxSignupSubmitHandler = (userObj) => {
    this.props.signup(userObj)
  }

  reduxSigninSubmitHandler = (userObj) => {
    this.props.login(userObj)
  }



  render() {
    return (
      <div className="grid">
        <div className="grid-header">
        <Header/>
        <Navbar/>
        </div>
        <div className="grid-body">
        top of app.js
        <Route path="/articles" render={()=> <Articles/>} />
        <Route path="/profile" render={()=> <Profile/>} />
        <Route path="/welcome" render={()=> <Welcome/>} />
        <Route path="/login" render={()=> <Login submitHandler={this.reduxSigninSubmitHandler}/>} />
        <Route path="/signup" render={()=> <Signup submitHandler={this.reduxSignupSubmitHandler}/>} />
        </div>
        <div className="grid-footer">
        
        <Footer/> 
        </div>
      </div>


    )
  }
}

function msp(state){
  // return {current_wall: state.user.wall}
}

function mdp(dispatch){
  return {
    login: (userObj) => dispatch(loginUser(userObj)),
    signup: (userObj) => dispatch(signupUser(userObj)) 
  }
}


export default connect(msp, mdp)(App);
