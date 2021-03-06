import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {editArticle} from '../Redux/actions'

export class EditArticle extends Component {

    state = {
        editButtonClicked: false,
        deleteButtonClicked: false,
        title: null,
        img_url: null,
        video_url: null,
        content: null,
        article_id: null
    }

    clickHandler =() => {

        this.setState({editButtonClicked: !this.state.editButtonClicked})
        this.setState({deleteButtonClicked: false})
        console.log("EditArticle props", this.state)
        console.log("edit form submited this.props.currentArticle",this.props.currentArticle)
        this.setState({
            title: this.props.currentArticle.title,
            img_url: this.props.currentArticle.img_url,
            video_url: this.props.currentArticle.video_url,
            content: this.props.currentArticle.content,
            article_id: this.props.currentArticle.id
        })
        
    
    }
    
    renderEditForm = () => {
        if(this.state.articleFormClicked){

            // return (<AddArticle fetchArticleData={this.props.fetchArticleData} />)
        }

    }

 

    
    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
        console.log(e.target.value)
    }

   

    articleSubmit = (e) => {
        e.preventDefault()
        // console.log("edit form submited this.state",this.state)
        this.setState({editButtonClicked: !this.state.editButtonClicked})
        let updatedArticleObj = {
            id: this.state.article_id,
            title: this.state.title,
            content: this.state.content,
            
            img_url: this.state.img_url,
            video_url: this.state.video_url
             
        }

        console.log("edit form submited updatedObj",updatedArticleObj)

        this.props.editArticle(updatedArticleObj)
        
        

        
        // console.log("in article submit function",this.state)
        // fetch("http://localhost:3001/articles", {
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

    deleteHandler = ()=> {
        console.log("delete clicked")
        this.setState({
            deleteButtonClicked: !this.state.deleteButtonClicked
            // editButtonClicked: !this.state.editButtonClicked
        })
        console.log(this.state.deleteButtonClicked)
    }

    confirmedDelete = () => {
        this.props.fetchArticleData()
        let article_id = this.props.currentArticle.id
        fetch(`http://localhost:3001/articles/${article_id}`, {
            method: 'DELETE'
        })
        .then(r => r.json())
        .then(updatedArticleArray => {
            console.log("updated articles array",updatedArticleArray)
        })
    }

    renderImageInput = () => {
        if(this.state.img_url === ""|this.state.img_url === null){
            return <input type="text" name="img_url"placeholder={"image url"} value={this.state.img_url} onChange={this.inputHandler}/>
        } else {
            return <input type="text" name="img_url"placeholder={this.state.img_url} value={this.state.img_url} onChange={this.inputHandler}/>
        }
    }
    
    renderVideoInput = () => {
        if(this.state.video_url === ""|this.state.video_url === null){
            return <input type="text" name="video_url"placeholder={"video url"} value={this.state.video_url} onChange={this.inputHandler}/>
        } else {
            return <input type="text" name="video_url"placeholder={this.state.video_url} value={this.state.video_url} onChange={this.inputHandler}/>
        }
    }

    render() {
        return (
            <div style={{"text-align":"center"}}>
                <NewButton onClick={this.clickHandler}>Edit </NewButton>
                {this.state.editButtonClicked?
                // editButtonClicked = true
                <>
                
                {this.state.deleteButtonClicked? 

                    <>
                    
                    <p>theres no going back</p>
                    <br></br>
                    </>
                    :
                    <>

                    <form onSubmit={this.articleSubmit}>
                    

                    <input type="text" name="title"placeholder={this.state.title} value={this.state.title} onChange={this.inputHandler}/>
                    <br></br>
                    <input type="text" name="content"placeholder={this.state.content}value={this.state.content} onChange={this.inputHandler}/>
                    <br></br>
                    {this.renderImageInput()}
                    <br></br>
                    {this.renderVideoInput()}
                    {/* <input type="text" name="img_url"placeholder={this.state.img_url} value={this.state.img_url} onChange={this.inputHandler}/> */}
                    <br></br>
                    {/* <input type="text" name="video_url"placeholder="Youtube_url" value={this.state.video_url} onChange={this.inputHandler}/> */}
                    <br></br>
                    
                    <NewButton type="submit">Submit </NewButton>

                    </form>
                    </>
                }
                
                {this.state.deleteButtonClicked? 
                    <>
                    </>
                    :
                    <NewButton  onClick={this.deleteHandler} >Delete </NewButton>
                }
                {this.state.deleteButtonClicked? 

                    <>
                    <NavLink to="/articles">
                    
                    <NewButton onClick={this.confirmedDelete} >DELETE FOREVER </NewButton>
                    </NavLink>
                    </>
                    :
                    <>
                    </>
                }

                </>
                // editButtonClicked = true -end
                :
                // editButtonClicked = false
                <>
                
                </>
                // editButtonClicked = false -end
                }

            </div>
        )
    }
}

const msp = (state) => {
    return{ 
        currentArticle: state.article
    }

}

function mdp(dispatch){
    return {
      
      editArticle: (articleObj) => dispatch(editArticle(articleObj))
      
    }
  }

export default connect(msp,mdp)(EditArticle)

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
