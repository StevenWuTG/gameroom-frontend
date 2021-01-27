import React, { Component } from 'react'
import GameCard from '../Components/GameCard'
import {connect} from 'react-redux'
import {fetchGames} from '../Redux/actions'
import styled from 'styled-components'




export class GamesContainer extends Component {

    state = {
        // gamesArray: null
        filteredGames: ""
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
            let desiredGames = this.props.gamesArray.filter(desiredGame => desiredGame.title.toLowerCase().includes(this.state.filteredGames.toLowerCase()))

            return desiredGames.map(game => <GameCard gameObj={game} />)
        }
        

    }

    filterHandler = (e) => {
        console.log(this.state.filteredGames)
        this.setState({filteredGames: e.target.value})
    }
    
    render() {
        return (
            <>
                <SearchWrapper>

                Search: <input onChange={this.filterHandler}></input>
                </SearchWrapper>
                <GamesWrapper>

                {/* {this.props.gameObj.name} */}
                {this.renderGames()}
                </GamesWrapper>
            
            </>
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


const SearchWrapper = styled.div`
  
  display: flex;
  align-items: center;
  
`
  
const GamesWrapper = styled.div`
    
  display: flex;
  min-height:600px;

  align-items: center;
  object-fit:contain;
  flex-wrap: wrap;
  
`
  
  