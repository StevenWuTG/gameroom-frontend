import React, { Component } from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { showArticle } from '../Redux/actions'
import styled from 'styled-components'
import icon1 from '../Images/icon1.png';
import icon2 from '../Images/icon2.png';
import icon3 from '../Images/icon3.png';
import icon4 from '../Images/icon4.png';

export class ArticleCard extends Component {

    renderArticle = () => {
        // console.log("article details clicked")
        // console.log("articleObj", this.props.articleObj)
        this.props.showArticle(this.props.articleObj)
        
    }

    averageRatings = () => {
        // console.log("average article ratings", this.props.articleObj.article_ratings)
        let total = 0
        const articleRatings = this.props.articleObj.article_ratings
        articleRatings.forEach(rating => {
            total += rating.star
            
        });
        let newTotal = total / articleRatings.length

        // console.log("new Total:", newTotal )
        if(newTotal){
            return <h3>Ratings: {newTotal}</h3>
        }
        
    }

   
    

    render() {
        return (
            
            <Card>

                <h2>{this.props.articleObj.title}</h2>
                
                <br></br>
                {this.props.articleObj.img_url === null | this.props.articleObj.img_url === "" ?
                <>
                <NavLink to="/showarticle">
                {/* <Photo onClick={this.renderArticle}src={"https://ca.res.keymedia.com/files/image/default(1).jpg"} alt={this.props.articleObj} /> */}
                <Photo onClick={this.renderArticle}src={icon1} alt={this.props.articleObj} />
                </NavLink>
                </>
                :
                <>
                <NavLink to="/showarticle">
                <Photo onClick={this.renderArticle} src={this.props.articleObj.img_url} alt={this.props.articleObj} />
                </NavLink>
                </>
                }
                {this.averageRatings()}
                <br></br>

                {/* <NavLink to="/showarticle">
                <button style={{"textAlign": "center"}} onClick={this.renderArticle}>Show</button>
                </NavLink> */}
                
                <br></br>
                <br></br>
                <br></br>
                
                
            </Card>
            
        )
    }
}
const msp = (state) => {
    return{ 
        
    }

}

function mdp(dispatch){
    return{
        showArticle: (postObj) => dispatch(showArticle(postObj)) 
    
    }
    
}

export default connect(msp,mdp)(ArticleCard)



const Card = styled.div`
display:flex;
flex-direction: column;
align-items:center;
width:300px;
height:300px;
object-fit:contain;
`
const Photo = styled.img`
display:flex;
flex-direction: column;
align-items:center;
width:150px;
height:auto;
object-fit:contain;
:hover {
    box-shadow: 1px 6px 15px rgba(0,0,0,0.5);
  }
`