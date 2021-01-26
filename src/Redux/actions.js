import {LOGIN,GET_USER, SIGNUP, LOG_OUT, REDUX_LOG_IN, REDUX_LOG_OUT,FETCH_ARTICLES,SHOW_ARTICLE,EDIT_ARTICLE,FETCH_GAMES, SHOW_GAME,SHOW_USER} from './actionTypes'

export function signupUser(userObj) {


    return function (dispatch) {
        // console.log("userobj in signup",userObj)
        fetch('http://localhost:3001/users', {
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
        fetch('http://localhost:3001/login', {
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


export function showArticle(postObj){
    
    return function(dispatch){
        dispatch({type: SHOW_ARTICLE, payload: postObj})
        
        
    }
}

export function updateShowArticle(articleId){
    
    return function(dispatch){
        fetch(`http://localhost:3001/articles/${articleId}`)
        .then(r => r.json())
        .then(articleObj => {
            dispatch({type: SHOW_ARTICLE, payload: articleObj})

        })
        
        console.log("updating showArticle", articleId)
        
        
    }
}

export function showGame(gameObj){
    
    return function(dispatch){
        dispatch({type: SHOW_GAME, payload: gameObj})
        
        
    }
}

export function fetchArticles(articlesArray){
    
    return function(dispatch){
        // fetch("http://localhost:3001/articles")
        //   .then(r => r.json())
        //   .then (arrayOfArticles => {
              
        //       if(arrayOfArticles === null ){
        //           console.log("no data fetched")
        //       } else {
      
        //           console.log("fetched array of articles", arrayOfArticles)
        //           dispatch({type: FETCH_ARTICLES, payload: arrayOfArticles})
        
        //       }
        //   })
        //   .catch(console.log)
        
        dispatch({type: FETCH_ARTICLES, payload: articlesArray})
        
    }
}

export function fetchGames(gamesArray){
    
    return function(dispatch){

        
        fetch("http://localhost:3001/games")
        .then(r => r.json())
        .then (arrayOfGames => {
            
            if(arrayOfGames === null ){
                console.log("no data fetched")
            } else if (arrayOfGames.errors){
                console.log("errors fetching games ")
            } else { 
                
                dispatch({type: FETCH_GAMES, payload: arrayOfGames})
                console.log("fetched array of games in redux", arrayOfGames)
               
            }
        })
        .catch(console.log)
                    
                    
    }
}
            
export function editArticle(articleObj){
    return function(dispatch){
        // console.log("in redux edit",articleObj )
                    
                fetch(`http://localhost:3001/articles/${articleObj.id}`,{
                    method:"PATCH",
                    headers:{
                        "Content-Type": "application/json",
                        "Accepts": "application/json"
                    },
                    body:JSON.stringify(articleObj)
                })
                .then(r => r.json())
                .then (newArticleObj => {
                    console.log("edited user in backend",newArticleObj)
                    dispatch({type: EDIT_ARTICLE, payload: newArticleObj})
        
                })
                .catch(console.log)
                
    }
}

export function setArticle(articleObj){
    return function(dispatch){
        console.log("in redux update",articleObj )
                    
                fetch(`http://localhost:3001/articles/${articleObj.id}`,{
                    method:"PATCH",
                    headers:{
                        "Content-Type": "application/json",
                        "Accepts": "application/json"
                    },
                    body:JSON.stringify(articleObj)
                })
                .then(r => r.json())
                .then (newArticleObj => {
                    console.log("edited user in backend",newArticleObj)
                    // dispatch({type: EDIT_ARTICLE, payload: newArticleObj})
        
                })
                .catch(console.log)
                
    }
}

export function returningUser(userObj) {
    return function(dispatch){
        dispatch({type: REDUX_LOG_IN, payload: true})
        dispatch({type: GET_USER, payload: userObj.user})
        
    }
    
    
}

export function reduxShowUser(userId){
    return function(dispatch){
        // console.log("in redux show user",userId)
        
        // fetch(`http://localhost:3001/users/${userId}`)
        // .then(r => r.json())
        // .then(userData => {
        //     console.log(userData)
        //     dispatch({type: SHOW_USER, payload: userData})
        // })
        dispatch({type: SHOW_USER, payload: userId})

    }
        // console.log("in redux show user")
}