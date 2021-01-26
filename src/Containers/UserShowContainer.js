import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import { updateShowArticle } from '../Redux/actions'

export class UserShowContainer extends Component {

    state = {
        updateArticleId : null,
        newestArticle:null,
        articleArray:null

    }

    componentDidMount(){
        console.log(this.props.showUser)
    
        this.setArticles()
    
            
        
    }

    setArticles = () =>{
        
        fetch(`http://localhost:3001/users/${this.props.showUser}`)
            .then(r => r.json())
            .then(userData => {
                console.log(userData)
                this.setState({articleArray:userData.articles})
                console.log(this.state.articleArray)
                this.resetNewestArticle()
            })
        
    }
    
    resetNewestArticle = () =>{
        
        let articles = this.state.articleArray
        console.log(articles)
        let sortedArticles = articles.sort((a,b) => {
            if (a.id !== b.id) {
                return a.id - b.id
            }
            if (a.name === b.name) {
                return 0;
            }
            return a.name > b.name ? 1 : -1;
            

        })
        sortedArticles.reverse()
        console.log(sortedArticles)
        this.setState({updateArticleId: sortedArticles[0].id})
        this.setState({newestArticle: sortedArticles[0]})
    }
    

    clickTester = ()=> {
        console.log(this.props.showUser)
        
    }

    renderLatestArticle = ()=> {
        

        return (
            <>

            <h4>
                Newest Article:
                <NavLink to="/showarticle" onClick={this.updateArticleShow}>
                    <div>
                    {this.state.newestArticle? 
                    <>
                    {this.state.newestArticle.title}
                    </>
                    :
                    <>
                    </>
                    
                    }

                    
                    </div>
                </NavLink>
                
            </h4>

            </>
        )
        
    }

    updateArticleShow = () =>{
        console.log("updatedArticle Show")
        this.props.updateShowArticle(this.state.newestArticle.id)


    }

    render() {
        return (
            <>
                
                {/* <button onClick={this.clickTester}>button</button> */}
                {this.props.showUser?
                
                <>
                    <h2>
                    {this.props.showUser.username}
                    </h2>

                    <br></br>
                    {this.props.showUser.avatar? 
                        <>
                        <img alt={this.props.showUser.username} style={{ maxWidth: "70vw", maxHeight: "20vh" }}src={this.props.showUser.avatar}></img>
                        </>
                        :
                        <>
                        <img alt={this.props.showUser.username} style={{ maxWidth: "70vw", maxHeight: "20vh" }}src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640"></img>
                        </>
                    }
                    <br></br>
                    {this.renderLatestArticle()}

                    
                </>
                :
                <>
                    no showUser in redux
                </>
                }
            </>
        )
    }
}

const msp = (state) => {
    return{ 
        showUser: state.showUser
    } 

}

function mdp(dispatch){
    return{

        // fetchGames: (apiData) => dispatch(fetchGames(apiData))
        updateShowArticle: (articleId) => dispatch(updateShowArticle(articleId)) 

    
    }
    
}
export default connect(msp,mdp)(UserShowContainer)
