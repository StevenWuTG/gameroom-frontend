import React, { Component } from 'react'

export class Article extends Component {
    render() {
        return (
            <>
                <img className="article-photo" src={this.props.articleObj.img_url} alt={this.props.articleObj} width="500" height="600" />
                {this.props.articleObj.content}
                {console.log("in article card")}
                
                
            </>
        )
    }
}

export default Article
