import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import { updateShowArticle } from '../Redux/actions'

export class UserShowContainer extends Component {

    state = {
        updateArticleId : null,
        newestArticle:null,
        articleArray:null,
        showUserObj: null

    }

    componentDidMount(){
        console.log(this.props.showUserId)
    
        this.setArticles()
    
            
        
    }

    setArticles = () =>{
        
        fetch(`http://localhost:3001/users/${this.props.showUserId}`)
            .then(r => r.json())
            .then(userData => {
                console.log(userData)
                this.setState({articleArray:userData.articles})
                this.setState({showUserObj:userData})
                console.log(this.state)
                this.resetNewestArticle()
            })
        
    }
    
    resetNewestArticle = () =>{
        if(this.state.articleArray){

            
            let articles = this.state.articleArray
            console.log(articles)
            let sortedArticles = articles.sort((a,b) => {
                if (a.id !== b.id) {
                    return a.id - b.id
                }
                if (a.name === b.name) {
                    return 0;
                }
                return a.name > b.name ? 1 : -1;
                
                
            })
            sortedArticles.reverse()
            console.log(sortedArticles)
            this.setState({updateArticleId: sortedArticles[0].id})
            this.setState({newestArticle: sortedArticles[0]})
        }
    }
    

    clickTester = ()=> {
        console.log(this.props.showUserId)
        
    }

    renderLatestArticle = ()=> {
        

        return (
            <>

            <h4>
                Newest Article:
                <NavLink to="/showarticle" onClick={this.updateArticleShow}>
                    <div>
                    {this.state.newestArticle? 
                    <>
                    {this.state.newestArticle.title}
                    </>
                    :
                    <>
                    </>
                    
                    }

                    
                    </div>
                </NavLink>
                
            </h4>

            </>
        )
        
    }

    updateArticleShow = () =>{
        console.log("updatedArticle Show")
        this.props.updateShowArticle(this.state.newestArticle.id)


    }

    followHandler = () => {
        if(this.props.loggedInUser){
            if(this.props.showUserId){

                return <button onClick={this.followShowUser} >Follow</button>
            }
        }
    }

    followShowUser = ()=> {
        console.log("this.props.loggedInUser",this.props.loggedInUser.id)
        console.log("this.props.showUserId",this.props.showUserId)

        let newFollowing = {
            user_id: this.props.loggedInUser.id,
            follow_id: this.props.showUserId

        }

        fetch("http://localhost:3001/followings", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body:JSON.stringify(newFollowing)
        })
        .then(r => r.json())
        .then(followingObj => {
            console.log("following created", followingObj)
        })

    }

    render() {
        return (
            <>
                
                {/* <button onClick={this.clickTester}>button</button> */}
                {this.state.showUserObj?
                
                <>
                    <h2>
                    {this.state.showUserObj.username}
                    </h2>

                    <br></br>
                    {this.state.showUserObj.avatar? 
                        <>
                        <img alt={this.state.showUserObj.username} style={{ maxWidth: "70vw", maxHeight: "20vh" }}src={this.state.showUserObj.avatar}></img>
                        </>
                        :
                        <>
                        <img alt={this.state.showUserObj.username} style={{ maxWidth: "70vw", maxHeight: "20vh" }}src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"></img>
                        </>
                    }
                    <br></br>
                    {this.renderLatestArticle()}

                    
                </>
                :
                <>
                    no showUser in redux
                </>
                }

                {this.followHandler()}


            </>
        )
    }
}

const msp = (state) => {
    return{ 
        showUserId: state.showUser,
        loggedInUser: state.user
    } 

}

function mdp(dispatch){
    return{

        // fetchGames: (apiData) => dispatch(fetchGames(apiData))
        updateShowArticle: (articleId) => dispatch(updateShowArticle(articleId)) 

    
    }
    
}
export default connect(msp,mdp)(UserShowContainer)
