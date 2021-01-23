import React, { Component } from 'react'
import {connect} from 'react-redux'
import AddArticle from '../Components/AddArticle'
import {fetchGames} from '../Redux/actions'

export class Profile extends Component {

    state={
        articleFormClicked: false
    }
    componentDidMount(){
        console.log("redux userObj",this.props.userObj)
        console.log("redux loggin state :",this.props.logged_in)
        this.props.fetchGames()
    }

    renderArticleForm = () => {
        if(this.state.articleFormClicked){

            return (<AddArticle fetchArticleData={this.props.fetchArticleData} />)
        }

    }

    formButtonHandler = () => {
        if(this.state.articleFormClicked ){
            this.setState({articleFormClicked: false})
        } else {
            this.setState({articleFormClicked: true})
            
        }

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
                <h2>
                {this.props.userObj.username}
                </h2>         
                <br></br>
                {this.props.userObj.avatar ? 
                
                <img alt={this.props.userObj.username} style={{ maxWidth: "70vw", maxHeight: "20vh" }}src={this.props.userObj.avatar}></img>
                :
                <img alt={this.props.userObj.username} style={{ maxWidth: "70vw", maxHeight: "20vh" }}src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"></img>
                
                }
                <br></br>
                Most Popular Article:
                <br></br>
                <h5 style={{"color": "red"}}>under construction check back later</h5>

                Post Article:
                <br></br>
                {/* <h5 style={{"color": "orange"}}>working on it...</h5> */}
                <button onClick={this.formButtonHandler}>Show form</button>

                {this.renderArticleForm()}





                

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

        fetchGames: (apiData) => dispatch(fetchGames(apiData))

    
    }
    
}
export default connect(msp,mdp)(Profile)
