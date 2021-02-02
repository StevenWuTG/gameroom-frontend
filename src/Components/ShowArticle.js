import React, { Component } from 'react'
import {connect} from "react-redux"
import {NavLink, Redirect, Link} from 'react-router-dom'
import ArticleRatingForm from "./ArticleRatingForm"
import EditArticle from "./EditArticle"
import ArticleCommentsContainer from "../Containers/ArticleCommentsContainer"
import ReactPlayer from "react-player"
import '../Css/App.css'
import {reduxShowUser} from '../Redux/actions'

import icon3 from '../Images/icon3.png';
import styled from 'styled-components'



export class ShowArticle extends Component {

    state = {
        ratingsArray : [],

    }



    componentDidMount(){
        // console.log("in /show this.props.post", this.props.articleObj)
        // this.fetchComments()
        console.log(this.props)
       
    }

    

    // averageRatings = () => {
    //     console.log("average article ratings", this.props.articleObj.article_ratings)
    //     let total = 0
    //     const articleRatings = this.props.articleObj.article_ratings
    //     articleRatings.forEach(rating => {
    //         total += rating.star
            
    //     });
    //     let newTotal = total / articleRatings.length

    //     console.log("new Total:", newTotal )
    //     return <h3>Ratings: {newTotal}</h3>
    // }
    
    averageRatings = () => {
        
        if(this.props.articleObj.article_ratings){

            let total = 0
            const articleRatings = this.props.articleObj.article_ratings
            articleRatings.forEach(rating => {
                total += rating.star
                
            });
            let newTotal = total / articleRatings.length
            
            // console.log("new Total:", newTotal )
            if(newTotal){
                
                return <h3>Ratings: {newTotal.toFixed(2)}</h3>
            }
        }
    }

    renderRatingForm = () => {
        if(this.props.articleObj && this.props.userObj){
            
            return <ArticleRatingForm renderRatings={this.renderRatings} fetchArticleData={this.props.fetchArticleData}  />
        }

    }
    
    renderRatings = () => {
        return <h4> {this.averageRatings()}</h4>
        
    }

    renderRelatedGame = () => {
       
        if(this.props.articleObj.game === null){
            return <div></div>
        } else if (this.props.articleObj.game.title){
            return <h5>{this.props.articleObj.game.title}</h5>
        } else {
            return <div></div>

        }
    }
    
    renderTitle = ()  => {
        if(this.props.articleObj.title){
            
            return <h1>{this.props.articleObj.title}</h1>
        } else {
            return <div></div>

        }
    }

    renderDate = () => {
        if(this.props.articleObj.created_at){
            let rawDate = this.props.articleObj.created_at
            let formatedDate = rawDate.slice(0,10)
            return(
                <>
                    Publish Date: {formatedDate}
                </>
            )
                
        }

    }

    renderEditButton = () => {
        // console.log("rendering edit button",this.props.articleObj.author)
        if(this.props.userObj === null ){
            return 
        } else if (this.props.userObj.id === this.props.articleObj.author.id) {
            return (
                <>
        
                    <EditArticle  fetchArticleData={this.props.fetchArticleData}/>
                </>
            )
        }
    }

    renderVideo = () => {
        if(this.props.articleObj.video_url === null | this.props.articleObj.video_url === ""){
            return 
        } else {
            return <div style={{"display": 'flex',"justify-content": "center"}} >
                    
                    <ReactPlayer playing={true}  muted={true} width={"50vw"} height={"50vh"}  controls  url={this.props.articleObj.video_url}/>
                
                    </div>
        }
    }

    showUser = () => {
        // e.preventDefault()

        // let user = 
        console.log("clicked",this.props.articleObj.author.id)
        this.props.reduxShowUser(this.props.articleObj.author.id)
        return

    }

    
    

    render() {
        
        const article = this.props.articleObj
        return (
            <Wrapper>
                
                {this.props.articleObj === null?
                    <>
                    no article in redux state
                    </>
                    :
                    //start of ShowArticle
                    <>
                    
                        {this.renderEditButton()}
                        {this.renderTitle()}
                        {this.renderRelatedGame()}
                        <br></br>
                            {this.props.articleObj.img_url === null | this.props.articleObj.img_url === "" ? 
                            <img src={icon3} alt={this.props.articleObj.title} width="200" height="200" />
                            :
                            <>
                            {this.props.articleObj.video_url?
                            <>
                            </>
                            :
                            <>
                            <img  className="article-photo" src={article.img_url} alt={this.props.articleObj.title} width="" height="80%" />
                            </>
                            }
                            </>
                        }
                        
                        {this.renderVideo()}
                        
                        <NavLink to="showuser">

                            <h4 onClick={this.showUser}  >Author: {article.author.username}</h4>
                        </NavLink>
                        

                        {this.renderRatings()}
                        {this.props.userObj === null ?
                        <>
                        </>
                        :
                        <>
                        {this.renderRatingForm()}
                        
                        </>
                        }

                        <p>{article.content}</p>


                        {/* <ArticleCommentsContainer articleId={this.props.articleObj.id} comments={this.props.articleObj.article_comments}/> */}
                        <ArticleCommentsContainer articleId={this.props.articleObj.id}/>
                        <br></br>
                        {this.renderDate()}
                    </> 
                    // end of ShowArticle
            
                }
                
            </Wrapper>
        )
    }
}

const msp = (state) => {
    return {
        articleObj: state.article,
        // userObj: state.user
    }
}

function mdp(dispatch){
    return{
        reduxShowUser: (userId) => dispatch(reduxShowUser(userId)) 
    
    }
    
}

export default connect(msp,mdp)(ShowArticle)

const Wrapper = styled.div` 
flex-direction: column;
display: flex;
align-items: center;
min-height:600px;
max-width:35%;
font-family: Verdana, sans-serif;
`

