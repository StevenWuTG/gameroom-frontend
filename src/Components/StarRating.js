import React,{useState} from 'react'
import styled from 'styled-components'
import {FaStar} from 'react-icons/fa'
import '../Css/App.css';

const StarRating = () => {

    const [rating,setRating] = useState(null)

    return (
        <div>
            {[...Array(5)].map((star,i) => {
                let ratingValue = i + 1;

                
                return (
                    <label>
                        <StarInput
                         type="radio"
                          name="rating"
                           value={ratingValue}
                            onClick={() => setRating={ratingValue}}
                             />
                        <FaStar className="star" size={25}/>
                        
                    </label>
                )
                
            })}
            
            
        </div>
    )
}
export default StarRating


const StarInput = styled.input`
    type: radio;
    display: none
`