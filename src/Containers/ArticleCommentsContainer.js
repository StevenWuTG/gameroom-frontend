import React, { Component } from 'react'
import ArticleComment from "../Components/ArticleComment"

export class ArticleCommentsContainer extends Component {

    state = {
        commentsArray: null
    }

    componentDidMount(){
        console.log("props in container", this.props)
        fetch("http://localhost:3001/article_comments")
        .then(r => r.json())
        .then(commentsData => {
            console.log("all comments ", commentsData)

            let articleComments = null

            commentsData.map(comment => {
                console.log("each comment",comment)
                if(comment.article.id === this.props.articleId){
                    // console.log(comment)
                    articleComments = []
                    if(articleComments !== null){

                        articleComments.push(comment)
                    }
                }
            })
            this.setState({commentsArray: articleComments})
        })

        //fetch comments that belong to article
    }

    renderComments = () => {
        let comments = this.state.commentsArray
        console.log("in article show comments:",comments)
        if(comments === null | comments === 0 ) {
            console.log("no comments")
            //  <p>no comments yet </p>
            return <>no comments </>
        } else if(comments ) {
            return comments.map(comment => <ArticleComment key={comment.id} commentObj={comment} />)
        } else {
            return <>no comments </>
        }

       
    }
    render() {
        return (
            <>

                <h3>comments:</h3>
                {this.state.commentsArray === null  ?
                        <>
                        {/* no comment array */}
                        </>
                        :
                        <>
                        
                        
                        </>
                        }
                {this.renderComments()} 
                <br></br>
                <button>comment</button>

            </>
        )
    }
}

export default ArticleCommentsContainer
