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

    render() {
        return (
            <>
                <img  className="article-photo" src={this.props.articleObj.img_url} alt={this.props.articleObj} width="300" height="300" />
                {/* {this.props.articleObj.content} */}
                <br></br>
                <NavLink to="/show">
                <button style={{"textAlign": "center"}} onClick={this.renderArticle}>Show</button>
                </NavLink>
                {/* <button onClick={this.renderArticle}>Details</button> */}
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
