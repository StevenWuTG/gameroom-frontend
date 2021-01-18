import React, { Component } from 'react'
import API_KEY from '../Api_keys2'



export class GamesContainer extends Component {

    componentDidMount(){
        console.log("api_key", API_KEY)
    }
    render() {
        return (
            <div>
                GamesContainer
            </div>
        )
    }
}

export default GamesContainer
