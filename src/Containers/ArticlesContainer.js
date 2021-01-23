import React, { Component } from 'react'
import ArticleCard from '../Components/ArticleCard'
import '../Css/Articles.css';

export class ArticlesContainer extends Component {
    
    state = {
        articleArray: null,
        filteredArticles: ""
    }

    componentDidMount(){
        console.log("Articles CDM")
        fetch("http://localhost:3001/articles")
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
            let desiredArticles = this.state.articleArray.filter(desiredArticle => desiredArticle.title.toLowerCase().includes(this.state.filteredArticles.toLowerCase()))
            return desiredArticles.map( article => <ArticleCard className="article-card center" key={article.id} articleObj={article}   />)
        }
    }

    filterHandler = (e) => {
        console.log(this.state.filteredArticles)
        this.setState({filteredArticles: e.target.value})
    }

    render() {
        return (
            <div>
                
                Search: <input onChange={this.filterHandler}></input>

                {this.renderArticles()}
                {this.showArticle}
            </div>
        )
    }
}

export default ArticlesContainer
