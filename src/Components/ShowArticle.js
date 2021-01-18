import React, { Component } from 'react'
import {connect} from "react-redux"

export class ShowArticle extends Component {

    componentDidMount(){
        console.log("in /show this.props.post", this.props.post)
    }
    render() {
        return (
            <div>
                showArticle component
                <h1>Author: {this.props.post.author}</h1>
                
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
