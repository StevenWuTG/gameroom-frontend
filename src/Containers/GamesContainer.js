import React, { Component } from 'react'
import GameCard from '../Components/GameCard'
import {connect} from 'react-redux'
import {fetchGames} from '../Redux/actions'




export class GamesContainer extends Component {

    state = {
        // gamesArray: null
    }

    componentDidMount(){
        
        this.props.fetchGames()


        
        
        
        
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
        console.log("rendering games", this.state.gamesArray)
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
function msp(state){
    return {
    
      gamesArray: state.gamesArray
    
    }
  }
  
  function mdp(dispatch){
    return {
      
      fetchGames: (apiData) => dispatch(fetchGames(apiData))
      
    }
  }
  
  
  export default connect(msp, mdp)(GamesContainer);
