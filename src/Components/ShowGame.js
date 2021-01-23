import React, { Component } from 'react'
import {connect} from 'react-redux'

import ReactPlayer from "react-player"

export class ShowGame extends Component {

    componentDidMount(){
      console.log("currentGameObj in redux",this.props.currentGameObj)

    }

    renderTitle = () => {

    }

    renderVideo = () => {
      if(this.props.currentGameObj.video_url === null | this.props.currentGameObj.video_url === ""){
          return 
      } else {
          return <div style={{"display": 'flex',"justify-content": "center"}} >
                  
                  <ReactPlayer  controls  url={this.props.articleObj.video_url}/>
              
                  </div>
      }
  }




    render() {
        return (
            <div>
                
                {this.renderTitle()}
                {this.props.currentGameObj.title}

            </div>
        )
    }
}

function msp(state){
    return {
    //   articlesArray: state.articlesArray,
    //   gamesArray: state.gamesArray,
    //   articleObj: state.article,
      userObj: state.user,
      currentGameObj: state.game
    }
  }
  
  function mdp(dispatch){
    return {
    //   login: (userObj) => dispatch(loginUser(userObj)),
    //   signup: (userObj) => dispatch(signupUser(userObj)),
      
    //   fetchArticles: (articleArray) => dispatch(fetchArticles(articleArray)),
    //   fetchGames: (apiData) => dispatch(fetchGames(apiData))
      
    }
  }
  
  
  export default connect(msp, mdp)(ShowGame);
