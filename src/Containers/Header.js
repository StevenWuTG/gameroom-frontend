import React, { Component } from 'react'
import styled from "styled-components"
import Navbar from '../Components/Navbar'

import {NavLink, Redirect} from 'react-router-dom'
import icon3 from '../Images/icon3.png';

export class Header extends Component {
    render() {
        return (
            <>
            <Wrapper>
                    <NavLink to={"./welcome"}>

                    <Photo src={icon3}/>
                    </NavLink>
                <Name>
                    GameRoom
                    
                </Name>
                <Navbar/>
                
                
            </Wrapper>
            </>
        )
    }
}

export default Header


const Wrapper = styled.div`

    height: 20%;
    justify-content:space-around;
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
    
`
const Name = styled.h1`
    
    font-weight:bold;
    font-family: Courier;
    font-size:60px;
    width:33%;
    align-items: left;
    color:white;
    justify-content:center;
    `
//     const HeaderLeft = styled.div`
//     display: flex;
//     flex-direction: row;
//     left:0;
//     align-items: center;
//     width:50%;
//     `
//     const HeaderMiddle = styled.div`
    
//     align-items: center;
//     width:33%;
//     float:none;
//     justify-content:center;
//     `
//     const HeaderRight = styled.div`
//     align-items: center;
//     width:33vh;
//     float:right;
// `
const Photo = styled.img`
display:flex;
flex-direction: column;
align-items:center;
width:150px;
height:150px;
object-fit:contain;
`