import React, { Component } from 'react'
import {connect} from "react-redux"
import ArticleRatingForm from "./ArticleRatingForm"

export class ShowArticle extends Component {

    state = {
        ratingsArray : []
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
        
        
        let total = 0
        const articleRatings = this.props.articleObj.article_ratings
        articleRatings.forEach(rating => {
            total += rating.star
            
        });
        let newTotal = total / articleRatings.length

        console.log("new Total:", newTotal )
        return <h3>Ratings: {newTotal}</h3>
    }

    renderRatingForm = () => {
        if(this.props.articleObj && this.props.userObj){
            
            return <ArticleRatingForm renderRatings={this.renderRatings} fetchArticleData={this.props.fetchArticleData} articleObj={this.props.articleObj} userObj={this.props.userObj} />
        }

    }
    
    renderRatings = () => {
        // console.log("show article.id", this.props.articleObj.id)
        // let id = this.props.articleObj.id
        // fetch(`http://localhost:5000/articles/${id}`)
        // .then(r=> r.json())
        // .then(articleData => {
        //     this.setState({ratingsArray: article_ratings)
        //     console.log(articleRatings)
        //     // articleRatings = articleData.article_ratings
        // })
        return <h4> {this.averageRatings()}</h4>
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
                    {this.props.articleObj.img_url === null | this.props.articleObj.img_url === "" ? 
                    <img src={"https://pbs.twimg.com/media/EK6BEwbXYAA78Bw.jpg"} alt={this.props.articleObj.title} width="300" height="300" />
                    :
                    
                    <img  className="article-photo" src={article.img_url} alt={this.props.articleObj.title} width="300vh" height="100%" />
                    }

                <p>{article.content}</p>
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
