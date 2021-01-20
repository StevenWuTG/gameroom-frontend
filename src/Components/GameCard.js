import React, { Component } from 'react'

export class GameCard extends Component {

    averageRatings = () => {
        console.log("game ratings", this.props.gameObj.game_ratings)
        let total = 0
        const gameRatings = this.props.gameObj.game_ratings
        gameRatings.forEach(rating => {
            total += rating.star
            
        });
        console.log("total:", total / gameRatings.length )
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
                <img  className="game-photo" src={this.props.gameObj.img_url} alt={this.props.gameObj.name} width="40%" height="40%" />
            </div>
        )
    }
}

export default GameCard
