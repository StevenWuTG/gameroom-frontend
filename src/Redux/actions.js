import {LOGIN, SIGNUP, LOG_OUT, REDUX_LOG_IN, REDUX_LOG_OUT,SHOW_POST} from './actionTypes'

export function signupUser(userObj) {


    return function (dispatch) {
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
                dispatch({type: REDUX_LOG_IN, payload: true})
            
            })
            .catch(console.log)
    }
}

export function loginUser(userObj) {
    return function(dispatch){
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
                dispatch({type: REDUX_LOG_IN, payload: true})
                
            })
            .catch(console.log)
    }
}

export function reduxLogout(){
    
    return function(dispatch){
        dispatch({type: REDUX_LOG_OUT, payload: false})
        dispatch({type: LOG_OUT, payload: null})
        
    }
    
    
}

export function showPost(postObj){
    
    return function(dispatch){
        dispatch({type: SHOW_POST, payload: postObj})
        
        
    }
}