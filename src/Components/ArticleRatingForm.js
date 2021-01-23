import React, { Component } from 'react'
import {connect} from 'react-redux'
import {showArticle} from '../Redux/actions'

export class ArticleRatingForm extends Component {

    state = {
        user_id: "",
        article_id: "",
        star: ""

        
    }
    componentDidMount(){
        console.log("redux  props.userObj", this.props.userObj)
        console.log("redux props.articleObj", this.props.articleObj)
        // this.setState({
        //     user_id: this.props.userObj.id,
        //     article_id: this.props.articleObj.id,
            
        // })
    }

    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
        console.log(e.target.value)
        console.log("this.state", this.state)
    }
    
    
    
    articleRatingSubmit = (e) => {
        e.preventDefault()
        
        console.log("articleRatingSubmit form value", e.target.star.value)
        // this.setState({star : e.target.form.value})
        // const ratingObj = this.state
        // console.log("articleRatingSubmit ratingObj", ratingObj)
        console.log("articleRatingSubmit this.state before fetch ", this.state)
        let newRating = {
            user_id: this.props.userObj.id,
            article_id: this.props.articleObj.id,
            star: e.target.star.value
        }
        fetch("http://localhost:3001/article_ratings", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body:JSON.stringify(newRating)
        })
        .then(r => r.json())
        .then(newArticleRating => {
            console.log("created new article rating", newArticleRating)
            this.resetReduxArticle()
        })
        
    }
    
    resetReduxArticle = () => {
        console.log("this.state", this.state)
        let id = this.props.articleObj.id
        
        console.log("resetReduxArticle article id:", id)
        fetch(`http://localhost:3001/articles/${id}`)
        .then(r=>r.json())
        .then(articleObj => {
            console.log("updated article", articleObj)
            this.props.showArticle(articleObj)
        })
        .catch(console.log)

    }

    render() {
        return (
            <div>
                Submit Your Star Rating:
                <form onSubmit={this.articleRatingSubmit}>

                
                <select name="star" value={this.state.star} onChange={this.inputHandler}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <button type="submit">Submit</button>
                
                </form>
            </div>
        )
    }
}

const msp = (state) => {
    return{ 
        userObj:state.user,
        articleObj: state.article
    }

}

function mdp(dispatch){
    return{
        showArticle: (postObj) => dispatch(showArticle(postObj)) 
    
    }
    
}
export default connect(msp, mdp)(ArticleRatingForm)
