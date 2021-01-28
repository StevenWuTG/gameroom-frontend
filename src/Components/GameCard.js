import React, { Component } from 'react'
import {connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import {showGame} from '../Redux/actions'
import styled from 'styled-components'

export class GameCard extends Component {

    averageRatings = () => {
        console.log("gameObj",this.props.gameObj)
        console.log("game ratings", this.props.gameObj.game_ratings)
        let total = 0
        const gameRatings = this.props.gameObj.game_ratings
        gameRatings.forEach(rating => {
            total += rating.star
            
        });
        let newTotal = total / gameRatings.length

        console.log("new Total:", newTotal )
        return newTotal
    }

    renderGame= ()=> {
        console.log("game photo  clicked")
        console.log("gameObj", this.props.gameObj)
        this.props.showGame(this.props.gameObj)

    }

    render() {
        return (
            <>
                <Card>
                <h2>
                {this.props.gameObj.title}

                </h2>
                <h2>
                Rating: {this.averageRatings()}
                </h2>
    
                {this.props.gameObj.img_url === null | this.props.gameObj.img_url === "" ?  
                <>
                    
                <NavLink to="/showgame">
                <Photo onClick={this.renderGame} src={"https://ca.res.keymedia.com/files/image/default(1).jpg"} alt={this.props.gameObj.name}/>
                {/* <img onClick={this.renderGame} className="article-photo" src={"https://ca.res.keymedia.com/files/image/default(1).jpg"} alt={this.props.gameObj.name} /> */}
                </NavLink>
                
                </>
                :
                <>

                <NavLink to="/showgame">
                
                <Photo onClick={this.renderGame} className="article-photo" src={this.props.gameObj.img_url} alt={this.props.gameObj.name}/>
                
                </NavLink>
                </>
                }
                </Card>  
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
        showGame: (gameObj) => dispatch(showGame(gameObj)) 
    
    }
    
}

export default connect(msp,mdp)(GameCard)

const Card = styled.div`
display:flex;
flex-direction: column;
align-items:center;
width:300px;
height:300px;
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