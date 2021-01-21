import React, { Component } from 'react'
import {connect} from 'react-redux'

export class AddArticle extends Component {

    state = {
        title: "",
        content: "",
        img_url: "",
        video_url: "",
        game_id: "",
        author: ""
    }

    componentDidMount(){
        this.setAuthor()
    }

    setAuthor = () => {
        this.setState({author:this.props.currentUser.username})
        // console.log("current user",this.props.currentUser)
    }

    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
        console.log(e.target.value)
    }

    articleSubmit = (e) => {
        e.preventDefault()

        this.setState({game_id:  e.target.game_id.value  })
        console.log("in article submit function",this.state)
        fetch("http://localhost:5000/articles", {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body:JSON.stringify(this.state)
        })
        .then(r => r.json())
        .then(newArticle => {
            console.log("created new article", newArticle)
            
            this.props.fetchArticleData()
        })
        
        console.log("article submit this.state", this.state)
        console.log("article submit e.target", e.target.game_id.value)
    }

   

    render() {
        return (
            <div>
                Article Form

                <br></br>
                <form onSubmit={this.articleSubmit}>

                <input type="text" name="title"placeholder="Title" value={this.state.title} onChange={this.inputHandler}/>
                <br></br>
                <input type="text" name="content"placeholder="Content" value={this.state.content} onChange={this.inputHandler}/>
                <br></br>
                <input type="text" name="img_url"placeholder="Image_url" value={this.state.img_url} onChange={this.inputHandler}/>
                <br></br>
                <input type="text" name="video_url"placeholder="Youtube_url" value={this.state.video_url} onChange={this.inputHandler}/>
                <br></br>
                
                <br></br>
                <button type="submit">Submit</button>
                
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



export default connect(msp, null)(AddArticle)
