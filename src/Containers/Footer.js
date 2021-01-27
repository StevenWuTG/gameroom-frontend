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
                <SubWrapper>

                
                <Link href={""} >Github</Link >
                <br></br>
                <Link href={""} >LinkedIn</Link >
                <br></br>
                <Link href={""} >footer</Link >
                {/* <button onClick={this.redirectTest}>redirect </button> */}
                </SubWrapper>
                
            </Wrapper>
        )
    }
}

export default Footer

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    padding:14px;
    `
const SubWrapper = styled.div`
    display: flex;
    flex-direction: flex;
    justify-content:space-around;
    padding:14px;
    `
const Link = styled.a`
display: flex;
flex-direction: row;
justify-content: center;
text-align:center;
padding-left:50px;
padding-right:50px;

`
