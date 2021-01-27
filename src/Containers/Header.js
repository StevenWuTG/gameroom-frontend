import React, { Component } from 'react'
import styled from "styled-components"

export class Header extends Component {
    render() {
        return (
            <>
            <Wrapper>
                <Name>
                    GamerTank
                </Name>
                
            </Wrapper>
            </>
        )
    }
}

export default Header


const Wrapper = styled.div`
    width 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Name = styled.h1`
    color:white
`
