import React, { Component } from 'react'
import Article from '../Components/Article'

export class Articles extends Component {
    
    state = {
        articleArray: []
    }

    componentDidMount(){
        console.log("Articles CDM")
        fetch("http://localhost:5000/articles")
        .then(r => r.json())
        .then (arrayOfArticles => {
            
            if(arrayOfArticles === null ){
                console.log("no data fetched")
            } else {
    
                console.log("fetched array of articles", arrayOfArticles)
                this.setState({articleArray: arrayOfArticles})
            }
        })
        .catch(console.log)
        
    }
    
    renderArticles = () => {
        return this.state.articleArray.map( article => <Article className="article-card" key={article.id} articleObj={article}  />)
    }

    render() {
        return (
            <div>
                

                {this.renderArticles()}
            </div>
        )
    }
}

export default Articles
