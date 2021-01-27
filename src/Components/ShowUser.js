import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import { updateShowArticle, loginUser } from '../Redux/actions'
import styled from 'styled-components'


export class ShowUser extends Component {

    state = {
        updateArticleId : null,
        newestArticle:null,
        articleArray:null,
        showUserObj: null,
        showUserArticles:null

    }

    componentDidMount(){
        console.log(this.props.showUserId)
    
        this.setArticles()
    
        this.fetchUserArticles()    
        
    }

    fetchUserArticles = () => {
        let userArticles = []

        if(this.props.showUserId){

            let showUserId = this.props.showUserId
            fetch(`http://localhost:3001/articles`)
            .then(r => r.json())
            .then(articlesArr => {
               console.log("fetched users articles", articlesArr)
               articlesArr.map( article => {
                   if(article.author.id === showUserId){
                    //    console.log("belows to user", article)
                       userArticles.push(article)
                   }
               })
               this.setState({showUserArticles: userArticles})
    
            })
            

        }
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
                <NavLink to="/showarticle" onClick={this.updateNewestArticleShow}>
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

    
    updateNewestArticleShow = () =>{
        console.log("updatedArticle Show")
        this.props.updateShowArticle(this.state.newestArticle.id)


    }
    updateHighestratedArticleShow = (id) =>{
        console.log("updatedArticle Show")
        this.props.updateShowArticle(id)


    }

    followHandler = () => {
        if(this.props.loggedInUser){
            if(this.props.showUserId){
                let userFollowed = this.props.loggedInUser.follows
                let followedIds = []
                userFollowed.map(follow => {
                    followedIds.push(follow.id)
                })
                
                let showUserId = this.props.showUserId
                console.log(showUserId)
                console.log(followedIds)
                if(followedIds.includes(showUserId)){
                    console.log("we did it")
                    // return <button onClick={this.unFollowShowUser} >UnFollow</button>
                }else {

                    // return <button >Follow</button>
                    return <button onClick={this.followShowUser} >Follow</button>
                }
                

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
            this.resetLoggedInUser(this.props.loggedInUser)
        })

    }

    resetLoggedInUser = ( userObj ) => {
        let userParams = {
            username: userObj.username,
            password: this.props.loggedInPassword
            //gotta fix after demo
        }
        this.props.loginUser(userParams)
        console.log("success on updating loggedIn user")

    }

    averageRatings = (articleRatingObj) => {
        // console.log("average article ratings", this.props.articleObj.article_ratings)
        let total = 0
        const articleRatings = articleRatingObj
        articleRatings.forEach(rating => {
            total += rating.star
            
        });
        let newTotal = total / articleRatings.length

        console.log("new Total:", newTotal )
        return newTotal
        // if(newTotal){
        //     return <h3>Ratings: {newTotal}</h3>
        // }
        
    }

    renderHighestArticle = () => {
        let sortedUserArticles = []
        if(this.state.showUserArticles){
            let showUserArticles = this.state.showUserArticles

            showUserArticles.map(article => { 
                console.log("articles average rating", article ) 
                sortedUserArticles.push({
                    articleObj:article,
                    averageRating:this.averageRatings(article.article_ratings)
                })

            })
            function compare(a,b) {
                if (a.averageRating < b.averageRating)
                   return -1;
                if (a.averageRating > b.averageRating)
                  return 1;
                return 0;
            }

            console.log("before user article s",sortedUserArticles)
            sortedUserArticles.sort(compare).reverse()  

            console.log("sorted user articles",sortedUserArticles)

            console.log(" highest sorted user article",sortedUserArticles[0])
            
            return (
                <>
                <h4>Highest Rated Article:
                    <br></br>
                    <NavLink to="/showarticle" onClick={this.updateHighestratedArticleShow(sortedUserArticles[0].articleObj.id)}>
                        
                    {sortedUserArticles[0].articleObj.title}
                        
                        
                        
                    </NavLink>
                    
                </h4>
                </>
            )
        }
        


    }

    render() {
        return (
            <>
            <Wrapper>
                
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
                    {this.renderHighestArticle()}

                    
                </>
                :
                <>
                    no showUser in redux
                </>
                }

                {this.followHandler()}


            </Wrapper>
            </>
        )
    }
}

const msp = (state) => {
    return{ 
        showUserId: state.showUser,
        loggedInUser: state.user,
        loggedInPassword: state.storedPassword,
        showUserId: state.showUser
    } 

}

function mdp(dispatch){
    return{

        // fetchGames: (apiData) => dispatch(fetchGames(apiData))
        updateShowArticle: (articleId) => dispatch(updateShowArticle(articleId)),
        loginUser: (userObj) => dispatch(loginUser(userObj))
        

    
    }
    
}
export default connect(msp,mdp)(ShowUser)

const Wrapper = styled.div` 
flex-direction: column;
display: flex;
align-items: center;
min-height:600px;

`