import React, { Component } from 'react'
import ArticleCard from '../Components/ArticleCard'
import '../Css/Articles.css';
import styled from 'styled-components'

export class ArticlesContainer extends Component {
    
    state = {
        articleArray: null,
        filteredArticles: "",
        filterParams: null
    }

    componentDidMount(){
        console.log("Articles CDM")
        if(this.state.filterParams === null){
            this.setState({filterParams:"newest"})
        }
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
        if(this.state.articleArray && this.state.filterParams === "newest"){
            let desiredArticles = this.state.articleArray.filter(desiredArticle => desiredArticle.title.toLowerCase().includes(this.state.filteredArticles.toLowerCase()))
            // console.log(this.state.articleArray)
            let sortedArticles = desiredArticles.sort((a, b) => {
                
                if (a.id !== b.id) {
                    return a.id - b.id
                }
                if (a.name === b.name) {
                    return 0;
                }
                return a.name > b.name ? 1 : -1;
            })
            return sortedArticles.reverse().map( article => <ArticleCard className="article-card center" key={article.id} articleObj={article}   />)
        } else if(this.state.articleArray && this.state.filterParams === "highest-rated"){
            // console.log("highest rated selected",this.state.articleArray)
            let desiredArticles = this.state.articleArray.filter(desiredArticle => desiredArticle.title.toLowerCase().includes(this.state.filteredArticles.toLowerCase()))
            
            let sortingArray = [] 
            desiredArticles.map(article => {
                // if(article.article_ratings.length !== 0){
                //     sortingArray.push(article)
                // }
                // if(article.article_ratings.length === 0){
                //     sortingArray.push(article)
                // }
                sortingArray.push(article)
            })

            // console.log("sorting array",sortingArray)
            
            function average(ratings){
                let total = 0
                const articleRatings = ratings
                articleRatings.forEach(rating => {
                    if(rating.star){
                        
                        total += rating.star
                    }
                    
                });
                let newTotal = total / articleRatings.length
                
                // console.log("new Total:", newTotal )
                if(newTotal){
                    return newTotal
                }
                
            }
            
            let sorted = []
            sortingArray.map( article => {
                // if(article.article_ratings){
                if(article.article_ratings.length !== 0){
                    sorted.push({
                        article:article,
                        averageRatings: average(article.article_ratings)
                    })
                    
                }  
                if (article.article_ratings.length === 0 ){
                    sorted.push({
                        article:article,
                        averageRatings: 0
                    })

                }
            })
            console.log("sorting",sortingArray)
            console.log("sorted",sorted)
            let finalSorted = sorted.sort(function(a,b) {
                // return parseFloat(a.averageRatings) - parseFloat(b.averageRatings);
                if(a.averageRatings >  b.averageRatings){
                    return -1
                } else if (a.averageRatings < b.averageRatings){
                    return 1
                } else {
                    return 0
                }
            })
            
            console.log("final sorted",finalSorted)

            
            
            return finalSorted.map( sortedArticle => <ArticleCard  key={sortedArticle.article.id} articleObj={sortedArticle.article}   />)
            
        }
    }
    

    

    

    searchFilterHandler = (e) => {
        console.log(this.state.filteredArticles)
        this.setState({filteredArticles: e.target.value})
    }

    sortArticles = (e) => {
        e.preventDefault()

        
        this.setState({filterParams:e.target.sortby.value})
        console.log("article filter params",this.state.filterParams)
    }

    render() {
        return (
            <>
                <SearchWrapper>

                Search: <input onChange={this.searchFilterHandler}></input> 
                {/* <br></br> */}
                <form onSubmit={this.sortArticles}>
                    Sort by:
                    <select name="sortby">
                        <option value="newest">newest</option>
                        <option value="highest-rated">highest rated</option>

                    </select> 

                    <NewButton type="submit"> sort </NewButton>
                </form>
                </SearchWrapper>
                <ArticlesWrapper>


                {this.renderArticles()}
                {this.showArticle}
                </ArticlesWrapper>
            </>
        )
    }
}

export default ArticlesContainer

const SearchWrapper = styled.div`
  
display: flex;
align-items: center;

`

const ArticlesWrapper = styled.div`
  
display: flex;
align-items: center;
object-fit:contain;
flex-wrap: wrap;
min-height:600px;

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
