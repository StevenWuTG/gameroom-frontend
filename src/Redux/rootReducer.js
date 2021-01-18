import {combineReducers} from 'redux'

const defaultState = {
    user:null,
    counter:0,
    logged_in: false,
    post: null
   
}

function userReducer(prevState= defaultState.user, action){
    switch(action.type){
        case"LOGIN":
            console.log("logging in", action.payload)
            return action.payload
        case"SIGNUP":
            console.log("creating user", action.payload)
            return action.payload
        case "GET_USER":
            console.log("GETTING user", action.payload)
            return action.payload
        case "LOG_OUT":
            console.log("LOG_OUT user", action.payload)
            return action.payload
        case "POST_USER":
            return [...prevState, action.payload]
        case "UPDATE_USER":
            return [...prevState, action.payload]     
        // case "ADD_USER_POSTS":
        //     return {  posts: [prevState.posts,action.payload]}
            // return [{ user: prevState.user, posts: ...prevState.posts, action.payload }]


        default:

            return prevState
                }
}

function loginReducer(prevState= defaultState.user, action){
    switch(action.type){
        case"REDUX_LOG_IN":
            console.log("logging in Redux")
            return action.payload
        case"REDUX_LOG_OUT":
            console.log("logging in Redux")
            return action.payload

        default:

            return prevState
                }
}
function postReducer(prevState= defaultState.post, action){
    switch(action.type){
        case"SHOW_POST":
            console.log("setting article in redux post")
            return action.payload
        

        default:

            return prevState
                }
}

const rootReducer =  combineReducers({
    user: userReducer,
    logged_in: loginReducer,
    post: postReducer

    
   
})

export default rootReducer 