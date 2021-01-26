import React, { Component } from 'react'

export class ArticleComment extends Component {
    componentDidMount(){
        // console.log("article comment CDM", this.props.commentObj)
    }
    render() {
        return (
            <div>
                {this.props.commentObj? 
                <>
                {this.props.commentObj.content}
                <br></br>
                -{this.props.commentObj.commenter.username}
                </>
                :
                <>
                </>
                }
                <br></br>
            </div>
        )
    }
}

export default ArticleComment
