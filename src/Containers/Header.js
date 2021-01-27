import React, { Component } from 'react'
import styled from "styled-components"

import {NavLink, Redirect} from 'react-router-dom'
import icon3 from '../Images/icon3.png';

export class Header extends Component {
    render() {
        return (
            <>
            <Wrapper>
                <HeaderLeft>
                    <NavLink to={"./welcome"}>

                    <Photo src={icon3}/>
                    </NavLink>
                </HeaderLeft>
                <HeaderMiddle>
                <Name>
                    
                    Game Room
                </Name>

                </HeaderMiddle>
                <HeaderRight>

                </HeaderRight>

                
            </Wrapper>
            </>
        )
    }
}

export default Header


const Wrapper = styled.div`
    width 100vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    object-fit:contain;
    `
    const Name = styled.h1`
    border: 1px black;
    font-weight:bold;
    font-family: Courier;
    font-size:40px;
    width:33%;
    height:100%;
    align-items: center;
    color:white;
    justify-content:center;
    `
    const HeaderLeft = styled.div`
    display: flex;
    flex-direction: row;
    left:0;
    align-items: center;
    width:50%;
    `
    const HeaderMiddle = styled.div`
    
    align-items: center;
    width:33%;
    float:none;
    justify-content:center;
    `
    const HeaderRight = styled.div`
    align-items: center;
    width:33vh;
    float:right;
`
const Photo = styled.img`
display:flex;
flex-direction: column;
align-items:center;
width:150px;
height:150px;
object-fit:contain;
`