import React, { Component } from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { showPost } from '../Redux/actions'

export class Article extends Component {

    renderArticle = () => {
        console.log("article details clicked")
        console.log("articleObj", this.props.articleObj)
        this.props.showPost(this.props.articleObj)
        
    }

    averageRatings = () => {
        console.log("average article ratings", this.props.articleObj.article_ratings)
        let total = 0
        const articleRatings = this.props.articleObj.article_ratings
        articleRatings.forEach(rating => {
            total += rating.star
            
        });
        let newTotal = total / articleRatings.length

        console.log("new Total:", newTotal )
        if(newTotal){
            return <h3>Ratings: {newTotal}</h3>
        }
        
    }

    

    render() {
        return (
            <>
                <h2>{this.props.articleObj.title}</h2>
                
                {this.averageRatings()}
                <br></br>
                {this.props.articleObj.img_url === null | this.props.articleObj.img_url === "" ?
                <>
                <img src={"https://ca.res.keymedia.com/files/image/default(1).jpg"} alt={this.props.articleObj} width="300" height="300" />
                </>
                :
                <>
                <img  className="article-photo" src={this.props.articleObj.img_url} alt={this.props.articleObj} width="300" height="300" />
                </>
                }
                <br></br>
                <NavLink to="/show">
                <button style={{"textAlign": "center"}} onClick={this.renderArticle}>Show</button>
                </NavLink>
                {/* <button onClick={this.renderArticle}>Details</button> */}
                <br></br>
                <br></br>
                <br></br>
                
                
            </>
        )
    }
}
const msp = (state) => {
    return{ 
        
    }

}

function mdp(dispatch){
    return{
        showPost: (postObj) => dispatch(showPost(postObj)) 
    
    }
    
}

export default connect(msp,mdp)(Article)
