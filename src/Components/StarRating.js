import React,{useState} from 'react'
import styled from 'styled-components'
import {FaStar} from 'react-icons/fa'
import '../Css/App.css';

const StarRating = () => {

    const [rating,setRating] = useState(null)
    const [hover,setHover] = useState(null)

    const submitRating = () => {
        if(rating === null){
            console.log("ya don goofed")
            return
        }
        console.log("submit clicked!", rating)
    }

    const articleRatingSubmit = (e) => {
        e.preventDefault()
        
        
        let newRating = {
            rater_id: this.props.userObj.id,
            article_id: this.props.articleObj.id,
            star: parseInt(rating)
        }

        console.log("newRating:", newRating)
        
        // fetch("http://localhost:3001/article_ratings", {
        //     method:"POST",
        //     headers:{
        //         "Content-Type": "application/json",
        //         "Accepts": "application/json"
        //     },
        //     body:JSON.stringify(newRating)
        // })
        // .then(r => r.json())
        // .then(newArticleRating => {
        //     console.log("created new article rating", newArticleRating)
        //     this.resetReduxArticle()
        // })
        
    }

    

    return (
        <form onSubmit={articleRatingSubmit}>
            {[...Array(5)].map((star,i) => {
                const ratingValue = i + 1;

                
                return (
                    <>
                    <label>
                        <StarInput
                         type="radio"
                         name="rating"
                         value={ratingValue}
                         onClick={() => setRating(ratingValue)}
                         
                         />
                        <FaStar 
                            className="star"
                            color={ratingValue <= ( hover || rating) ? "#ffc107" : "#e4e5e9"} size={25}
                            onMouseEnter={()=> setHover(ratingValue)}
                            onMouseLeave={()=> setHover(null)}
                            
                            />
                        
                    </label>
                    
                    </>
                )
                
            })}
            
            
            <NewButton type={"submit"} onClick={submitRating} >Submit </NewButton>
        </form>
    )
}
export default StarRating


const StarInput = styled.input`
    type: radio;
    display: none 
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
