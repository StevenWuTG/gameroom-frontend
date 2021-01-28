import React, { Component } from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

export class EditUser extends Component {

    state = {
        editClicked: false,
        bio: null,
        avatar: null,
        email: null
    }
    
    componentDidMount(){
        this.setEditinputs()
        console.log("editUser props", this.props)
    }
    
    setEditinputs = () => {
        if(this.props.currentUser){

            this.setState({
                
                bio: this.props.currentUser.bio,
                avatar: this.props.currentUser.avatar,
                email: this.props.currentUser.email,
            })
        }
    }

    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
        console.log(e.target.value)
    }

    editClickHandler = () => {
        this.setState({editClicked: !this.state.editClicked})
        console.log(this.state.editClicked)

    }

    userSubmit = (e) => {
        e.preventDefault()
        let currentUser = this.props.currentUser
        let editedUser = {
            bio: this.state.bio,
            avatar: this.state.avatar,
            email: this.state.email
            
        }
        console.log("edited user", editedUser)
        console.log("currentUser Id", currentUser.id)

        fetch(`http://localhost:3001/users/${currentUser.id}`,{
                    method:"PATCH",
                    headers:{
                        "Content-Type": "application/json",
                        "Accepts": "application/json"
                    },
                    body:JSON.stringify(editedUser)
                })
                .then(r => r.json())
                .then (editedUser => {
                    console.log("edited user in backend",editedUser)
                    this.props.resetLoggedInUser(editedUser)
                    this.setState({editClicked:false})
                    
        
                })
                .catch(console.log)
        


    }


    renderForm = () => {
        if(this.state.editClicked){
            console.log("editClicked")
            return (
                
                <form onSubmit={this.userSubmit}>
                    Email:
                    {
                    this.state.email === null | this.state.email === ""? 

                    <input type="text" name="email" placeholder={"Email"} value={this.state.email} onChange={this.inputHandler}/>
                    :
                    <input type="text" name="email" placeholder={this.state.email} value={this.state.email} onChange={this.inputHandler}/>
                    
                    }
                    <br></br>
                    Avatar Url:
                    {
                    this.state.avatar === null | this.state.avatar === ""? 

                    <input type="text" name="avatar" placeholder={"Avatar Url"} value={this.state.avatar} onChange={this.inputHandler}/>
                    
                    :
                    
                    <input type="text" name="avatar" placeholder={this.state.avatar} value={this.state.avatar} onChange={this.inputHandler}/>
                    }
                    <br></br>
                    Bio:
                    {
                    this.state.bio === null | this.state.bio === ""? 
                    
                    <input type="text" name="bio" placeholder={"Bio description"} value={this.state.bio} onChange={this.inputHandler}/>
                    :
                    <input type="text" name="bio" placeholder={this.state.bio} value={this.state.bio} onChange={this.inputHandler}/>
                    }
                    <br></br>
                    
                    <NewButton type="submit"> Submit </NewButton>
                </form>
                
            )
            
        }
    }
    render() {
        return (
            <div style={{"text-align":"center"}}>
                
                {this.state.editClicked? 
                <>
                <NewButton onClick={this.editClickHandler}>NeverMind </NewButton>
                </>
                :
                <>
                <NewButton onClick={this.editClickHandler}>Edit User </NewButton>
                </>
                }

                {this.renderForm()}
            </div>
        )
    }
}

const msp = (state) => {
    return{ 
        // currentUser: state.user,
        // logged_in: state.logged_in
    }

}

function mdp(dispatch){
    return{

        // fetchGames: (apiData) => dispatch(fetchGames(apiData)),
        // reduxShowUser: (userId) => dispatch(reduxShowUser(userId)) 

    
    }
    
}
export default connect(msp,mdp)(EditUser)

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