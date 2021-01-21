import React, { Component } from 'react'
import {connect} from 'react-redux'
import {editArticle} from '../Redux/actions'

export class EditArticle extends Component {

    state = {
        editButtonClicked: false,
        title: null,
        img_url: null,
        content: null,
        article_id: null
    }

    clickHandler =() => {

        this.setState({editButtonClicked: !this.state.editButtonClicked})
        console.log("EditArticle props", this.state)
        console.log("edit form submited this.props.currentArticle",this.props.currentArticle)
        this.setState({
            title: this.props.currentArticle.title,
            img_url: this.props.currentArticle.img_url,
            content: this.props.currentArticle.content,
            article_id: this.props.currentArticle.id
        })
        
    
    }
    
    renderEditForm = () => {
        if(this.state.articleFormClicked){

            // return (<AddArticle fetchArticleData={this.props.fetchArticleData} />)
        }

    }

    formButtonHandler = () => {
        if(this.state.articleFormClicked ){
            this.setState({articleFormClicked: false})
        } else {
            this.setState({articleFormClicked: true})
            
        }

    }

    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
        console.log(e.target.value)
    }

   

    articleSubmit = (e) => {
        e.preventDefault()
        // console.log("edit form submited this.state",this.state)
        
        let updatedArticleObj = {
            id: this.state.article_id,
            title: this.state.title,
            content: this.state.content,
            
            img_url: this.state.img_url
             
        }

        console.log("edit form submited updatedObj",updatedArticleObj)

        this.props.editArticle(updatedArticleObj)
        
        

        
        // console.log("in article submit function",this.state)
        // fetch("http://localhost:5000/articles", {
        //     method:"POST",
        //     headers:{
        //         "Content-Type": "application/json",
        //         "Accepts": "application/json"
        //     },
        //     body:JSON.stringify(this.state)
        // })
        // .then(r => r.json())
        // .then(newArticle => {
        //     console.log("created new article", newArticle)
            
        //     this.props.fetchArticleData()
        // })
        
        // console.log("article submit this.state", this.state)
        // console.log("article submit e.target", e.target.game_id.value)
    }


    render() {
        return (
            <div>
                <button onClick={this.clickHandler}>Edit</button>
                {this.state.editButtonClicked?
                // editButtonClicked = true
                <>
                true
                <form onSubmit={this.articleSubmit}>

                <input type="text" name="title"placeholder={this.state.title} value={this.state.title} onChange={this.inputHandler}/>
                <br></br>
                <input type="text" name="content"placeholder={this.state.content}value={this.state.content} onChange={this.inputHandler}/>
                <br></br>
                <input type="text" name="img_url"placeholder={this.state.img_url} value={this.state.img_url} onChange={this.inputHandler}/>
                <br></br>
                {/* <input type="text" name="video_url"placeholder="Youtube_url" value={this.state.video_url} onChange={this.inputHandler}/> */}
                <br></br>
                
                <button type="submit">Submit</button>

                </form>

                </>
                // editButtonClicked = true -end
                :
                // editButtonClicked = false
                <>
                false
                </>
                // editButtonClicked = false -end
                }

            </div>
        )
    }
}

const msp = (state) => {
    return{ 
        currentArticle: state.post
    }

}

function mdp(dispatch){
    return {
      
      editArticle: (articleObj) => dispatch(editArticle(articleObj))
      
    }
  }

export default connect(msp,mdp)(EditArticle)
