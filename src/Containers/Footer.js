import React, { Component } from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import styled from 'styled-components'
import githubsmall from '../Images/githubsmall.png';
import linkedinicon from '../Images/linkedinicon.png';
import mediumicon from '../Images/mediumicon.png';

export class Footer extends Component {

    redirectTest = () => {
        console.log("clicked")
        
        
    }
    render() {
        return (
            <Wrapper>
               

                
                <Link href={"https://github.com/StevenWuTG"} >
                    <Icon src={githubsmall}/>
                </Link >
                
                <Link href={"https://www.linkedin.com/in/steven-wu-914568205/"} >
                    <Icon src={linkedinicon}/>
                    
                </Link >
                
                <Link href={"https://stevenwu91.medium.com/"} >
                    <Icon src={mediumicon}/>
                    
                </Link >
                
            </Wrapper>
        )
    }
}

export default Footer

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    padding:30px;
    width:100%;
    background-color:grey;
`

const Link = styled.a`
`

const Icon = styled.img`
    max-height: 36px;
    max-width: 36px;

`