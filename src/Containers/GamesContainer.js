import React, { Component } from 'react'
import GameCard from '../Components/GameCard'




export class GamesContainer extends Component {

    state = {
        gamesArray: []
    }

    componentDidMount(){

        
        
        
        
    }
    
    // fetchGameData = () => {
    //     const apiKey = process.env.REACT_APP_API_KEY
    //     fetch(`https://api.rawg.io/api/games?key=${apiKey}&ordering=released&platforms=18,1,7&metacritic=90,100`)
    //     .then(r => r.json())
    //     .then(apiData => {
    //         console.log("api data",apiData)
    //         this.setState({gamesArray: apiData.results})
    //     })

    // }

    
    renderGames = () => {
        console.log("rendering games", this.props.gamesArray)
        if(this.props.gamesArray){

            return this.props.gamesArray.map(game => <GameCard gameObj={game} />)
        }
        

    }
    
    render() {
        return (
            <div>
                {/* {this.props.gameObj.name} */}
                {this.renderGames()}
            </div>
        )
    }
}

export default GamesContainer
