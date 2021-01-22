import React, { Component } from 'react'
import {connect} from "react-redux"
import ArticleRatingForm from "./ArticleRatingForm"
import EditArticle from "./EditArticle"
import ReactPlayer from "react-player"
import '../Css/App.css'



export class ShowArticle extends Component {

    state = {
        ratingsArray : [],

    }



    componentDidMount(){
        console.log("in /show this.props.post", this.props.articleObj)
       
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
            
            console.log("new Total:", newTotal )
            if(newTotal){
                
                return <h3>Ratings: {newTotal}</h3>
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
            
            return <h3>{this.props.articleObj.title}</h3>
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
                    <h5>Publish Date:{formatedDate}</h5>
                </>
            )
                
        }

    }

    renderEditButton = () => {
        console.log("rendering edit button",this.props.articleObj.author)
        if(this.props.userObj === null ){
            return 
        } else if (this.props.userObj.username === this.props.articleObj.author) {
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
                    
                    <ReactPlayer  controls  url={this.props.articleObj.video_url}/>
                
                    </div>
        }
    }

    
    

    render() {
        
        const article = this.props.articleObj
        return (
            <div>
                
                {this.props.articleObj === null?
                <>
                no article in redux state
                </>
                :
                <>

                {this.renderEditButton()}
                {this.renderTitle()}
                {this.renderRelatedGame()}
                <br></br>
                    {this.props.articleObj.img_url === null | this.props.articleObj.img_url === "" ? 
                    <img src={"https://pbs.twimg.com/media/EK6BEwbXYAA78Bw.jpg"} alt={this.props.articleObj.title} width="300" height="300" />
                    :
                    
                    <img  className="article-photo" src={article.img_url} alt={this.props.articleObj.title} width="300vh" height="100%" />
                    }
                
                {this.renderVideo()}
                

                <h4>Author: {article.author}</h4>
                
                {this.renderRatings()}

                {this.props.userObj === null ?
                <>
                </>
                :
                <>
                {this.renderRatingForm()}

                
                
                </>
                }

                {this.renderDate()}
                
                <p>{article.content}</p>

                </>
            
                }
                
            </div>
        )
    }
}

const msp = (state) => {
    return {
        // articleObj: state.post,
        // userObj: state.user
    }
}

export default connect(msp,null)(ShowArticle)
