import React, { Component } from 'react'
import {connect} from 'react-redux'
import ArticleComment from "../Components/ArticleComment"
import AddComment from "../Components/AddComment"


export class ArticleCommentsContainer extends Component {

    state = {
        commentsArray: null,
        userObj: null,
        commentFormClicked: false
    }

    componentDidMount(){
        // console.log("props in container", this.props)
        // console.log("state in container", this.state)
        this.fetchComments()
        
        //fetch comments that belong to article
    }
    
    fetchComments = ()=> {
        this.setState({commentFormClicked:false})
        fetch("http://localhost:3001/article_comments")
        .then(r => r.json())
        .then(commentsData => {
            // console.log("all comments ", commentsData)
    
            let articleComments = []
    
            commentsData.map(comment => {
                // console.log("each comment",comment)
                if(comment.article.id === this.props.currentArticle.id){
                    // console.log(comment)
                   
                    
    
                    articleComments.push(comment)
                    
                }
            })
            // console.log(articleComments)
            this.setState({commentsArray: articleComments})
        })

    }

    renderComments = () => {
        let comments = this.state.commentsArray
        // console.log("in article show comments:",comments)
        if(comments === null | comments === [] ) {
            // console.log("no comments")
            //  <p>no comments yet </p>
            return <>no comments </>
        } else if(comments ) {
            return comments.map(comment => <ArticleComment key={comment.id} commentObj={comment} />)
        } else {
            return <>no comments </>
        }

       
    }

    renderCommentButton = () => {
        // console.log("rendering comment button this.props.userObj",this.props.userObj)
        
        console.log(this.props.userObj)
        if(this.props.userObj){
            return <button >Button</button>
        }
    }

    commentButtonHandler = () => {
        // if(this.state.commentFormClicked ){
        //     this.setState({commentFormClicked: false})
        //     console.log(this.state.commentFormClicked)
        // } else {
        //     this.setState({commentFormClicked: true})
        //     console.log(this.state.commentFormClicked)
            
        // }
        this.setState({commentFormClicked: !this.state.commentFormClicked })

    }

    renderCommentForm = () => {
        if(this.state.commentFormClicked && this.props.userObj){

            return (<AddComment fetchComments={this.fetchComments} />)
        } 

    }

    showCommentButton = ()=> {
        // if(this.state.commentFormClicked && this.props.userObj){
        //     return <button onClick={this.commentButtonHandler}>Nevermind</button>
        // } else if (this.state.commentFormClicked === false){
        //     return <button onClick={this.commentButtonHandler}>Comment</button>
        // } else {
        //     return <button onClick={this.commentButtonHandler}>Comment</button>

        // }
        if(this.props.userObj && this.state.commentFormClicked){
            return <button onClick={this.commentButtonHandler}>Nevermind</button>
        } else if (this.props.userObj && !this.state.commentFormClicked ){    
            return <button onClick={this.commentButtonHandler}>Comment</button>
        } else {
            return
        }

    }
    
    render() {
        return (
            <>

                <h3>comments:</h3>
                
                {this.renderComments()} 
                <br></br>
                {/* {this.renderCommentButton()} */}
                {this.renderCommentForm()}

                {/* {this.state.commentFormClicked && this.props.userObj? 
                <>
                <button onClick={this.commentButtonHandler}>Nevermind</button>
                </>
                :
                <>

                <button onClick={this.commentButtonHandler}>Comment</button>

                </>
                } */}

                {this.showCommentButton()}
                

            </>
        )
    }
}
const msp = (state) => {
    return {
    
        userObj: state.user,
        currentArticle: state.article
    }
}

export default connect(msp,null)(ArticleCommentsContainer)