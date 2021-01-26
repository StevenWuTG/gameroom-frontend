import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect} from 'react-router-dom'
import {showArticle} from '../Redux/actions'

export class AddComment extends Component {

    state = {
        finishedSubmit: false
        
    }

    componentDidMount(){
        
        console.log("this.props",this.props)
    }

    commentSubmit = (e) => {
        e.preventDefault()
        // console.log(e.target.content.value)
        // console.log("this.props",this.props)

        let newCommentObj = {
            content: e.target.content.value,
            article_id: this.props.currentArticle.id,
            commenter_id: this.props.currentUser.id
            
        }
        console.log("before comment create fetch",newCommentObj)
        fetch("http://localhost:3001/article_comments/", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body:JSON.stringify(newCommentObj)
        })
        .then(r => r.json())
        .then(newArticleComment => {
            // console.log(newArticleComment)
            if(newArticleComment.errors){
                console.log("errors creating new comment", newArticleComment.errors)
                console.log("this.state.finishedSubmit", this.state.finishedSubmit)
            } else {
                console.log(newArticleComment)
                this.setState({finishedSubmit: true})
                this.props.fetchComments()
                
                // this.props.showArticle(newArticleComment)

                //need to reset current article show to include new comments

            }
            
        })



    }

    submitRedirect = () => {
        if(this.state.finishedSubmit === true){
            this.setState({finishedSubmit: false})
            console.log("redirecting")
            return <Redirect to="showarticle" />
        }

    }

    render() {
        return (
            <div>
                <br></br>
                AddComment
                
                <form onSubmit={this.commentSubmit}>


                
                <input type="text" name="content"placeholder="Content"  />
                <br></br>
                {/* <select name="game_id"  value={this.state.game_id} onChange={this.inputHandler}>
                    <option value={""}>Select Game</option>
                    {this.listGames()}
                    <option value={""}>No Game</option>
                </select> */}
                
                <br></br>
                
                
                <button type="submit">Submit</button>
                {this.submitRedirect()}
                
                
                </form>
                
            </div>
        )
    }
}

const msp = (state) => {
    // console.log("calling msp in addArticle")
    return {
        currentUser: state.user,
        currentArticle: state.article
    }

}

const mdp = (dispatch) =>{
    return{
        // showArticle: (postObj) => dispatch(showArticle(postObj)) 
    
    }
    
}



export default connect(msp, mdp)(AddComment)