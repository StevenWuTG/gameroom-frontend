import React, { Component } from 'react'
import {connect} from 'react-redux'
import AddArticle from '../Components/AddArticle'
import {fetchGames, reduxShowUser} from '../Redux/actions'
import {NameLink} from '../Components/NameLink'
import {EditUser } from '../Components/EditUser'
import {loginUser } from '../Redux/actions'
import styled from 'styled-components'


export class Profile extends Component {

    state={
        articleFormClicked: false
    }
    componentDidMount(){
        console.log("redux userObj",this.props.userObj)
        console.log("redux loggin state :",this.props.logged_in)
        this.props.fetchGames()
    }

    renderArticleForm = () => {
        if(this.state.articleFormClicked){

            return (<AddArticle fetchArticleData={this.props.fetchArticleData} />)
        }

    }

    formButtonHandler = () => {
        if(this.state.articleFormClicked ){
            this.setState({articleFormClicked: false})
        } else {
            this.setState({articleFormClicked: true})
            
        }

    }

    renderFollowed = () => {
        if(this.props.userObj){
            let userFollows = this.props.userObj.follows
            console.log("userFollows",userFollows)
            return userFollows.map(follow =>  <NameLink reduxShowUser={this.props.reduxShowUser} linkUser={follow}/>)
        }

    }

    resetLoggedInUser = ( userObj ) => {
        let userParams = {
            username: userObj.username,
            password: this.props.loggedInPassword
            //gotta fix after demo
        }
        this.props.loginUser(userParams)
        console.log("success on updating loggedIn user",userParams)

    }

    renderBio = () =>{
        if(this.props.userObj){

            if(this.props.userObj.bio){
                return <p>{this.props.userObj.bio}</p>
            } else {
                return <p>need to set a bio to display here</p>
                
            }
        }
        
    }
    
    renderUsername = ()=> {
        if(this.props.userObj){
            return <h2>{this.props.userObj.username}</h2>
        }

    }
    
    renderAvatar = ()=> {
        if(this.props.userObj){
            if(this.props.userObj.avatar === null | this.props.userObj.avatar === ""){
                return <img alt={this.props.userObj.username} style={{ maxWidth: "70vw", maxHeight: "20vh" }}src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"></img>
            } else if (this.props.userObj.avatar){
                return <img alt={this.props.userObj.username} style={{ maxWidth: "70vw", maxHeight: "20vh" }}src={this.props.userObj.avatar}></img>
            }
            
        }

    }
    

    render() {
        return (
            <>
                <Wrapper>

                {this.props.logged_in === false || this.props.logged_in === null ? 
                <>
                <h1>Please log in</h1>
                </>
                :
                <>
                <EditUser resetLoggedInUser={this.resetLoggedInUser} currentUser={this.props.userObj}/>
                {this.renderArticleForm()}
                    Post Article:
                    <br></br>
                    {/* <h5 style={{"color": "orange"}}>working on it...</h5> */}
                    <NewButton onClick={this.formButtonHandler}>Show form </NewButton>
               
                {this.renderUsername()}    
                <br></br>
                {this.renderAvatar()}
                {this.renderBio()}
                <br></br>
                {/* Most Popular Article:
                <br></br>
            <h5 style={{"color": "red"}}>under construction check back later</h5> */}


                <br></br>    
                <br></br>    
                Following:
                {this.renderFollowed()}





                

                </>
                }

                </Wrapper>
            </>
        )
    }
}

const msp = (state) => {
    return{ 
        userObj: state.user,
        logged_in: state.logged_in,
        loggedInPassword: state.storedPassword
    }

}

function mdp(dispatch){
    return{

        fetchGames: (apiData) => dispatch(fetchGames(apiData)),
        reduxShowUser: (userId) => dispatch(reduxShowUser(userId)), 
        loginUser: (userObj) => dispatch(loginUser(userObj)) 

    
    }
    
}
export default connect(msp,mdp)(Profile)

const Wrapper = styled.div`
  
  
  flex-direction: column;
  display: flex;
  align-items: center;

`

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
  margin: 12px;
  
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