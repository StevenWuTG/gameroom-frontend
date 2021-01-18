import React, { Component } from 'react'
import {connect} from "react-redux"

export class ShowArticle extends Component {

    componentDidMount(){
        console.log("in /show this.props.post", this.props.post)
    }
    render() {

        const post = this.props.post
        return (
            <div>
                
                {this.props.post === null?
                <>
                no article in redux state
                </>
                :
                <>
                <img  className="article-photo" src={post.img_url} alt={this.props.articleObj} width="300vh" height="100%" />
                <p>{post.content}</p>
                <h4>Author: {post.author}</h4>

                </>
            
                }
                
            </div>
        )
    }
}

const msp = (state) => {
    return {
        post: state.post
    }
}

export default connect(msp,null)(ShowArticle)
