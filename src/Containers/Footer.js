import React, { Component } from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import styled from 'styled-components'

export class Footer extends Component {

    redirectTest = () => {
        console.log("clicked")
        
        
    }
    render() {
        return (
            <Wrapper>
               

                
                <Link href={""} >Github</Link >
                
                <Link href={""} >LinkedIn</Link >
                
                <Link href={""} >footer</Link >
                
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