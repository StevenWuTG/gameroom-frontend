import React, { Component } from 'react'
import {connect} from 'react-redux'

import ReactPlayer from "react-player"
import styled from 'styled-components'

export class ShowGame extends Component {

    componentDidMount(){
      console.log("currentGameObj in redux",this.props.currentGameObj)

    }

    renderTitle = () => {
      if(this.props.currentGameObj.title){
            
        return (
          <>
          <h3>{this.props.currentGameObj.title}</h3>
          <div>By: {this.props.currentGameObj.publisher}</div>
          </>

        ) 
      } else {
          return

      }

    }

    renderVideo = () => {
      if(this.props.currentGameObj.video_url === null | this.props.currentGameObj.video_url === ""){
        if(this.props.currentGameObj.video_url === null | this.props.currentGameObj.video_url === ""){
          return <img src={"https://pbs.twimg.com/media/EK6BEwbXYAA78Bw.jpg"} alt={this.props.currentGameObj.title} width="300" height="300" />

        } else {
          return <img src={this.props.currentGameObj.img_url} alt={this.props.currentGameObj.title} width="300vh" height="100%" />
        }
          return 
      } else {
          return <div style={{"display": 'flex',"justify-content": "center"}} >
                  
                  <ReactPlayer playing={true} muted={true} height={"50vh"} width={"50vw"}  controls  url={this.props.currentGameObj.video_url}/>
              
                  </div>
      }
    }

  renderDesc = () => {
    if(this.props.currentGameObj.description === null | this.props.currentGameObj.description === ""){
      return
    } else {
      return <p>{this.props.currentGameObj.description}</p>
    }
  }
  renderGenre = () => {
    if(this.props.currentGameObj.genre === null | this.props.currentGameObj.genre === ""){
      return
    } else {
      return (
        <>
        
          Genre: {this.props.currentGameObj.genre} 
        </>
      )
    }

  }
  renderPubliser = () => {
    if(this.props.currentGameObj.publisher === null | this.props.currentGameObj.publisher === ""){
      return
    } else {
      return (
        <>
        
           Publisher: {this.props.currentGameObj.publisher}
        </>
      )
    }

  }
  renderReleased = () => {
    if(this.props.currentGameObj.release_date === null | this.props.currentGameObj.release_date === ""){
      return
    } else {
      return (
        <>
        
          Release Date: {this.props.currentGameObj.release_date}
        </>
      )
    }

  }



  render() {
        return (
            <Wrapper>
                
                
                {this.renderTitle()}
                
                {this.renderVideo()}
                {this.renderDesc()}
                <br></br>
                <br></br>
             

                <InfoBox>
                <div>
                {this.renderGenre()} 
                  
                </div>
                <div>
                {this.renderPubliser()}

                </div>
                <div>
                {this.renderReleased()}

                </div>
                
                
               
                </InfoBox>
                
                

            </Wrapper>
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

const Wrapper = styled.div`
  
font-family: Verdana, sans-serif;
  flex-direction: column;
  display: flex;
  align-items: center;
  min-height:600px;
  width:100%;
  max-width:50vw;
  padding: 20px;

`
const InfoBox = styled.div`
  width: 50vw;
  display:flex;
  flex-direction: row;
  justify-content:space-between;
  

`