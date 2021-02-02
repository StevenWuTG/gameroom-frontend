import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect} from 'react-router-dom'
import { showArticle } from '../Redux/actions'
import styled from 'styled-components'

export class AddArticle extends Component {

    state = {
        title: "",
        content: "",
        img_url: "",
        video_url: null,
        game_id: "",
        author_id: null,
        finishedSubmit: false
    }

    componentDidMount(){
        this.setAuthor()
    }

    setAuthor = () => {
        this.setState({author_id:this.props.currentUser.id})
        // console.log("current user",this.props.currentUser)
    }

    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
        // console.log(e.target.value)
    }

    articleSubmit = (e) => {
        e.preventDefault()

        // this.setState({game_id:  e.target.game_id.value  })
        let newArticleObj = {
            title: this.state.title,
            content: this.state.content,
            img_url: this.state.img_url,
            video_url: this.state.video_url,
            game_id: e.target.game_id.value ,
            author_id: this.state.author_id,
        }
        // console.log("in article submit function this.state",this.state)
        // console.log("in article submit function newArticleObj",newArticleObj)
        fetch("http://localhost:3001/articles", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body:JSON.stringify(newArticleObj)
        })
        .then(r => r.json())
        .then(newArticle => {
            if(newArticle.errors){
                
                console.log("errors creating new article: ", newArticle.errors)
                // alert("errors creating new article: ", newArticle.errors)
            } else {

                console.log("created new article", newArticle)
                this.setState({finishedSubmit: true})
                this.props.fetchArticleData()
                this.props.showArticle(newArticle)
            }
        })
        
        
        
    }

    listGames = () => {
        // console.log("games array in addArticle form", this.props.gamesArray)
        if (this.props.gamesArray){

            return this.props.gamesArray.map(game => <option value={game.id}  >{game.title}</option>)
        }

    }

    submitRedirect = () => {
        if(this.state.finishedSubmit === true){
            this.setState({finishedSubmit: false})
            return <Redirect to="showarticle" />
        }
    }

   

    render() {
        return (
            <div style={{"text-align":"center"}}>
                Article Form

                <br></br>
                <form onSubmit={this.articleSubmit}>
                <select name="game_id"  value={this.state.game_id} onChange={this.inputHandler}>
                    <option value={""}>Select Game</option>
                    {this.listGames()}
                    <option value={""}>No Game</option>
                </select>
                <br></br>

                <input type="text" name="title"placeholder="Title" value={this.state.title} onChange={this.inputHandler}/>
                <br></br>
                <input type="text" name="img_url"placeholder="Image_url" value={this.state.img_url} onChange={this.inputHandler}/>
                <br></br>
                <input type="text" name="video_url"placeholder="Youtube_url" value={this.state.video_url} onChange={this.inputHandler}/>
                <br></br>
                <input type="text" name="content"placeholder="Content" value={this.state.content} onChange={this.inputHandler}/>
                
                <br></br>
                
                
                <NewButton type="submit">Submit</NewButton>
                {this.submitRedirect()}
                
                
                </form>
                

                
            </div>
        )
    }
}
const msp = (state) => {
    // console.log("calling msp in addArticle")
    return {
        currentUser: state.user,
        gamesArray: state.gamesArray
    }

}

const mdp = (dispatch) =>{
    return{
        showArticle: (postObj) => dispatch(showArticle(postObj)) 
    
    }
    
}



export default connect(msp, mdp)(AddArticle)


const NewButton = styled.button`
position:relative;
  width: auto;
  display:inline-block;
  color:#ecf0f1;
  text-decoration:none;
  border-radius:5px;
  border:solid 1px #f39c12;
  background:#e67e22;
  text-align:center;
  margin: 12px;
  
  -webkit-transition: all 0.1s;
	-moz-transition: all 0.1s;
	transition: all 0.1s;
	
  -webkit-box-shadow: 0px 6px 0px #d35400;
  -moz-box-shadow: 0px 6px 0px #d35400;
  box-shadow: 0px 6px 0px #d35400;

  :active{
    -webkit-box-shadow: 0px 2px 0px #d35400;
    -moz-box-shadow: 0px 2px 0px #d35400;
    box-shadow: 0px 2px 0px #d35400;
    position:relative;
    top:4px;
}
`

