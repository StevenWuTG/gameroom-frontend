import {LOGIN, SIGNUP} from './actionTypes'

export function signupUser(userObj) {


    return function (dispatch, getState) {
        // console.log("userobj in signup",userObj)
        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                "Accepts": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({ user: userObj })
        })
            .then(r => r.json())
            .then(newUserObj => {

                
                localStorage.setItem("token", newUserObj.jwt)
                dispatch({type: SIGNUP, payload: newUserObj.user})
            
            })
            .catch(console.log)
    }
}

export function loginUser(userObj) {
    return function(dispatch, getState){
        fetch('http://localhost:5000/login', {
            method: "POST",
            headers: {
                "Accepts": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({ user: userObj })
        })
            .then(r => r.json())
            .then(checkedUserObj => {
                console.log("checkedUserObj:",checkedUserObj)
                localStorage.setItem("token", checkedUserObj.jwt)
                dispatch({type: LOGIN, payload: checkedUserObj.user})
                
                // console.log("checkedUserObj.posts:",checkedUserObj.user.posts)
                // dispatch({type: ADD_POSTS, payload: checkedUserObj.user.posts})
            })
            .catch(console.log)
    }
}