import React, { Component } from 'react'

export class GameCard extends Component {
    render() {
        return (
            <div>
                
                <h2>
                {this.props.gameObj.name}

                </h2>
                <h2>
                Meta Rating: {this.props.gameObj.metacritic}

                </h2>
                <br></br>
                <img  className="game-photo" src={this.props.gameObj.background_image} alt={this.props.gameObj.name} width="300" height="300" />
            </div>
        )
    }
}

export default GameCard
