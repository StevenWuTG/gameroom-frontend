import React, { Component } from 'react'
import {connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import {showGame} from '../Redux/actions'

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
            <div>
                
                <h2>
                {this.props.gameObj.title}

                </h2>
                <h2>
                   
                Rating: {this.averageRatings()}

                </h2>
                <br></br>
                {this.props.gameObj.img_url === null | this.props.gameObj.img_url === "" ?  
                <>
                <NavLink to="/showgame">
                <img onClick={this.renderGame}  className="game-photo" src={"https://ca.res.keymedia.com/files/image/default(1).jpg"} alt={this.props.gameObj.name} width="40%" height="40%" />
                </NavLink>
                </>
                :
                <>
                <NavLink to="/showgame">
                <img onClick={this.renderGame}  className="game-photo" src={this.props.gameObj.img_url} alt={this.props.gameObj.name} width="40%" height="40%" />
                </NavLink>
                </>
                }
            </div>
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

