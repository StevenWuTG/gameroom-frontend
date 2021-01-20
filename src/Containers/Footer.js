import React, { Component } from 'react'
import {NavLink, Redirect} from 'react-router-dom'

export class Footer extends Component {

    redirectTest = () => {
        console.log("clicked")
        
        
    }
    render() {
        return (
            <>
                
                <h1 >footer</h1>
                {/* <button onClick={this.redirectTest}>redirect </button> */}
                
            </>
        )
    }
}

export default Footer
