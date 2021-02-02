import React, { Component } from 'react'
import styled from "styled-components"
export class Welcome extends Component {
    render() {
        return (
            <WelcomeWrapper>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h1 style={{"max-width": "40vw", "line-height": "60px","font-family": "Verdana", "font-size": "36px" }}>
                  Welcome to The Game Room , a place where you can post articles about your favorite games and check out our personal game database.
                  <br></br>
                  <br></br>
                  <br></br>
                  If you enjoyed the website you can check out my contact links down below.

                </h1>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                {/* <img src="
                https://www.healthecareers.com/binaries/content/gallery/healthecareers-us-en/article-features/december-2016/welcome-new-doctor.jpg" height="300px"></img> */}
            </WelcomeWrapper>
        )
    }
}

export default Welcome

const WelcomeWrapper = styled.div`
  
display: flex;
flex-direction:column;
align-items: center;
object-fit:contain;
flex-wrap: wrap;
min-height:600px;

background-position: 0px 0px;
  width: 100%;
  height: 100%;
  background: url(http://i.imgur.com/7RaHlPr.gif), url(http://i.imgur.com/IN5uXk1.gif);
  padding: 5px;
  box-sizing: border-box;
  
	-moz-animation: animatedBackground 4s linear infinite;
	-webkit-animation: animatedBackground 4s linear infinite;
	-ms-animation: animatedBackground 4s linear infinite;
	-o-animation: animatedBackground 4s linear infinite;
  animation: animatedBackground 6s linear infinite;
  @keyframes animatedBackground {
	0% { background-position: 0 0, 0 0; rotate: 0deg;}
	100% { background-position: 300px -100px, 600px -100px;}
}
@-moz-keyframes animatedBackground {
	0% { background-position: 0 0, 0 0; }
	100% { background-position: -300px 100px, -600px 100px; }
}
@-webkit-keyframes animatedBackground {
	0% { background-position: 0 0, 0 0; }
	100% { background-position: -300px 100px, -600px 100px; }
}
@-ms-keyframes animatedBackground {
	0% { background-position: 0 0, 0 0; }
	100% { background-position: -300px 100px, -600px 100px; }
}
@-o-keyframes animatedBackground {
	0% { background-position: 0 0, 0 0; }
	100% { background-position: -300px 100px, -600px 100px; }
}
`