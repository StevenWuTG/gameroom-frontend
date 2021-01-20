import React, { Component } from 'react'
import Article from '../Components/Article'
import '../Css/Articles.css';

export class ArticlesContainer extends Component {
    
    state = {
        articleArray: null
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

        //fetch list of articles again
        
    }

    
    
    renderArticles = () => {
        if(this.state.articleArray){

            return this.state.articleArray.map( article => <Article className="article-card center" key={article.id} articleObj={article}   />)
        }
    }

    render() {
        return (
            <div>
                

                {this.renderArticles()}
                {this.showArticle}
            </div>
        )
    }
}

export default ArticlesContainer
