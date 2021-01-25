import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import './Css/App.css';

import Header from './Containers/Header'
import Footer from './Containers/Footer'
import ArticlesContainer from './Containers/ArticlesContainer'
import Profile from './Containers/Profile'
import GamesContainer from './Containers/GamesContainer'

import Navbar from './Components/Navbar'
import ShowArticle from './Components/ShowArticle'
import ShowGame from './Components/ShowGame'
import Welcome from './Components/Welcome'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { connect } from 'react-redux'

import { loginUser, signupUser, returningUser, fetchArticles, fetchGames} from './Redux/actions'

export class App extends Component {

  state = {
    gamesArray: [],
    // articleArray: []
  }

  componentDidMount(){
    const apiKey = process.env.REACT_APP_API_KEY

    // this.fetchGameData()
    this.fetchArticleData()

    const token = localStorage.getItem("token")
    console.log("app started ,token: ",token)
    if(token){
      fetch("http://localhost:3001/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }  
      })
      .then(r => r.json())
      .then(returningUser => {
        console.log("returning User", returningUser)
        this.props.returningUser(returningUser)
      })
    }

    
  }

  // fetchGameData = () => {
  //   const apiKey = process.env.REACT_APP_API_KEY
  //   fetch(`https://api.rawg.io/api/games?key=${apiKey}&ordering=released&platforms=18,1,7&metacritic=90,100`)
  //   .then(r => r.json())
  //   .then(apiData => {
  //       console.log("api data",apiData)
  //       this.setState({gamesArray: apiData.results})
  //   })

  // }

  

  fetchArticleData = () => {
    //need to refractor to redux function
    console.log("Articles CDM")
          fetch("http://localhost:3001/articles")
          .then(r => r.json())
          .then (arrayOfArticles => {
              
              if(arrayOfArticles === null ){
                  console.log("no data fetched")
              } else {
      
                  console.log("fetched array of articles", arrayOfArticles)
                  // this.setState({articleArray: arrayOfArticles})
                  this.props.fetchArticles(arrayOfArticles)
              }
          })
          .catch(console.log)

  }

  

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
          

        <Route path="/articles" render={()=> <ArticlesContainer className="center" articleArray={this.props.articlesArray}/>} />
        <Route path="/games" render={()=> <GamesContainer />} />
        <Route path="/login" render={()=> <Login submitHandler={this.reduxSigninSubmitHandler}/>} />
        <Route path="/signup" render={()=> <Signup submitHandler={this.reduxSignupSubmitHandler}/>} />
          
        <Route path="/showarticle" render={()=> <ShowArticle userObj={this.props.userObj} articleObj={this.props.articleObj} fetchArticleData={this.fetchArticleData} />} />
        <Route path="/showgame" render={()=> <ShowGame />} />
        <Route path="/profile" render={()=> <Profile fetchArticleData={this.fetchArticleData}/>} />
        <Route path="/welcome" render={()=> <Welcome/>} />
        
        {this.props.userObj && this.props.logged_in ? 
        <>
        <Redirect to="/profile"/>
        </>
        :
        <>
        <Redirect to="/welcome"/>
        </>

        }


        </div>
        <div className="grid-footer">
        
        <Footer/> 
        </div>
      </div>


    )
  }
}

function msp(state){
  return {
    articlesArray: state.articlesArray,
    gamesArray: state.gamesArray,
    articleObj: state.post,
    userObj: state.user,
    logged_in: state.logged_in

  }
}

function mdp(dispatch){
  return {
    login: (userObj) => dispatch(loginUser(userObj)),
    signup: (userObj) => dispatch(signupUser(userObj)),
    
    fetchArticles: (articleArray) => dispatch(fetchArticles(articleArray)),
    fetchGames: (apiData) => dispatch(fetchGames(apiData)),
    returningUser: (apiData) => dispatch(returningUser(apiData))
    
  }
}


export default connect(msp, mdp)(App);
