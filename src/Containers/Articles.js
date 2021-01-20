import React, { Component } from 'react'
import Article from '../Components/Article'
import '../Css/Articles.css';

export class Articles extends Component {
    
    state = {
        // articleArray: []
    }

    componentDidMount(){
        // console.log("Articles CDM")
        // fetch("http://localhost:5000/articles")
        // .then(r => r.json())
        // .then (arrayOfArticles => {
            
        //     if(arrayOfArticles === null ){
        //         console.log("no data fetched")
        //     } else {
    
        //         console.log("fetched array of articles", arrayOfArticles)
        //         this.setState({articleArray: arrayOfArticles})
        //     }
        // })
        // .catch(console.log)
        
    }

    
    
    renderArticles = () => {
        if(this.props.articleArray){

            return this.props.articleArray.map( article => <Article className="article-card center" key={article.id} articleObj={article}   />)
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

export default Articles
