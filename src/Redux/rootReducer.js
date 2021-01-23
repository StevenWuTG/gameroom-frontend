import {combineReducers} from 'redux'

const defaultState = {
    user:null,
    counter:0,
    logged_in: false,
    article: null,
    game: null,
    gamesArray: null,
    articlesArray: null
   
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
function articleReducer(prevState= defaultState.article, action){
    switch(action.type){
        case"SHOW_ARTICLE":
            console.log("setting article in redux post")
            return action.payload
        case"EDIT_ARTICLE":
            console.log("editing article in redux ")
            return action.payload

        default:

            return prevState
                }
}
function gameReducer(prevState= defaultState.game, action){
    switch(action.type){
        case"SHOW_GAME":
            console.log("setting article in redux post")
            return action.payload
        case"EDIT_GAME":
            console.log("editing article in redux ")
            return action.payload

        default:

            return prevState
                }
}

function articlesArrayReducer(prevState= defaultState.articlesArray, action){
    switch(action.type){
        case"FETCH_ARTICLES":
            console.log("Fetching articles in redux ", action.payload)
            return action.payload
        

        default:

            return prevState
                }
}
function gamesArrayReducer(prevState= defaultState.gamesArray, action){
    switch(action.type){
        case"FETCH_GAMES":
            console.log("Fetching games in redux ", action.payload)
            return action.payload
        

        default:

            return prevState
                }
}

const rootReducer =  combineReducers({
    user: userReducer,
    logged_in: loginReducer,
    article: articleReducer,
    game: gameReducer,
    gamesArray: gamesArrayReducer,
    articlesArray: articlesArrayReducer

    
   
})

export default rootReducer 