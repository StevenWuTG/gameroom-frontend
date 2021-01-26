import React, { Component } from 'react'
import {connect} from 'react-redux'
import AddArticle from '../Components/AddArticle'
import {fetchGames, reduxShowUser} from '../Redux/actions'
import {NameLink} from '../Components/NameLink'
import {EditUser } from '../Components/EditUser'
import {loginUser } from '../Redux/actions'


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
        if(this.props.userObj.bio){
            return <p>{this.props.userObj.bio}</p>
        } else {
            return <p>need to set a bio to display here</p>

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
                    <button onClick={this.formButtonHandler}>Show form</button>
               
                {this.renderUsername()}    
                <br></br>
                {this.renderAvatar()}
                {this.renderBio()}
                <br></br>
                Most Popular Article:
                <br></br>
                <h5 style={{"color": "red"}}>under construction check back later</h5>


                <br></br>    
                <br></br>    
                Following:
                {this.renderFollowed()}





                

                </>
                }

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
