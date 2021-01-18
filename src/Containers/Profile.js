import React, { Component } from 'react'
import {connect} from 'react-redux'

export class Profile extends Component {
    componentDidMount(){
        console.log("redux userObj",this.props.userObj)
        console.log("redux loggin state :",this.props.logged_in)
    }

    render() {
        return (
            <>
                {this.props.logged_in === false || this.props.logged_in === null ? 
                <>
                <h1>Please log in</h1>
                </>
                :
                <>
                <img alt={this.props.userObj.username} style={{ maxWidth: "70vw", maxHeight: "20vh" }}src={this.props.userObj.avatar}></img>
                </>
                }

            </>
        )
    }
}

const msp = (state) => {
    return{ 
        userObj: state.user,
        logged_in: state.logged_in
    }

}

function mdp(dispatch){
    return{

    
    }
    
}
export default connect(msp,mdp)(Profile)
