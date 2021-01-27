import React, { Component } from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { reduxLogout,storePassword } from '../Redux/actions'
import styled from 'styled-components'

export class Navbar extends Component {

    state={
        clicked:null
    }

    logout = () => {
        
        console.log(localStorage.clear())
        localStorage.clear("token")
        this.props.reduxLogout()
        this.setState({clicked:true})
        this.props.storePassword(null)

        

        

    }

   
   

    render() {
        return (
            <Wrapper>
            {this.props.logged_in? 
            <>
            <NavLink to="/welcome">
                <NewButton> Welcome </NewButton>
            </NavLink>
            <NavLink to="/articles">
                <NewButton>Articles</NewButton>
            </NavLink>
            <NavLink to="/games">
                <NewButton>Games</NewButton>
            </NavLink>
            <NavLink to="/Profile">
                <NewButton>Profile</NewButton>
            </NavLink>
            <NewButton onClick= {this.logout}>Logout</NewButton>
            </>
            :
            <>

            <NavLink to="/articles">
                <NewButton>Articles</NewButton>
            </NavLink>
            <NavLink to="/games">
                <NewButton>Games</NewButton>
            </NavLink>
            <NavLink to="/welcome">
                <NewButton>Welcome</NewButton>
            </NavLink>
            <NavLink to="/signup">
                <NewButton>Signup</NewButton>
            </NavLink>
            <NavLink to="/login">
                <NewButton>Login</NewButton>
            </NavLink>
            { this.props.logged_in === false ? 
            
            <>
            <Redirect to="/welcome"/>
            </>
            :
            <>
            </>
            }
            </>
            }
                
            </Wrapper>
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
        reduxLogout: () => dispatch(reduxLogout()),
        storePassword: (val) => dispatch(storePassword(val))
    
    }
    
}


export default connect(msp,mdp)(Navbar)

const Wrapper = styled.div`
  
  
  flex-direction: flex;
  display: flex;
  align-items: center;
  object-fit: contain;  
`

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
  padding:14px;
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
