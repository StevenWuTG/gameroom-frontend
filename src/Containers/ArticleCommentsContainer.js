import React, { Component } from 'react'
import {connect} from 'react-redux'
import ArticleComment from "../Components/ArticleComment"
import styled from 'styled-components'
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
            return <NewButton > Button</NewButton>
        }
    }

    commentButtonHandler = () => {
        this.setState({commentFormClicked: !this.state.commentFormClicked })

    }

    renderCommentForm = () => {
        if(this.state.commentFormClicked && this.props.userObj){

            return (<AddComment fetchComments={this.fetchComments} />)
        } 

    }

    showCommentButton = ()=> {
        
        if(this.props.userObj && this.state.commentFormClicked){
            return <NewButton onClick={this.commentButtonHandler}>Nevermind </NewButton>
        } else if (this.props.userObj && !this.state.commentFormClicked ){    
            return <NewButton onClick={this.commentButtonHandler}>Comment </NewButton>
        } else {
            return
        }

    }
    
    render() {
        return (
            <Wrapper>

                <h3>comments:</h3>
                
                {this.renderComments()} 
                <br></br>
                {/* {this.renderCommentButton()} */}
                {this.renderCommentForm()}


                {this.showCommentButton()}
                

            </Wrapper>
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


const Wrapper = styled.div`
border:2px black;
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
