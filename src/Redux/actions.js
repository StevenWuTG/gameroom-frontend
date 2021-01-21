import {LOGIN, SIGNUP, LOG_OUT, REDUX_LOG_IN, REDUX_LOG_OUT,SHOW_POST,FETCH_ARTICLES,FETCH_GAMES,EDIT_POST} from './actionTypes'

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

export function fetchArticles(articlesArray){
    
    return function(dispatch){
        // fetch("http://localhost:5000/articles")
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

        dispatch({type: FETCH_GAMES, payload: gamesArray})
        
        // fetch("http://localhost:5000/")
        //   .then(r => r.json())
        //   .then (arrayOfGames => {
            
            //       if(arrayOfGames === null ){
                //           console.log("no data fetched")
                //       } else {
                    
                    //           console.log("fetched array of articles", arrayOfGames)
                    //           dispatch({type: FETCH_GAMES, payload: arrayOfGames})
                    
                    //       }
                    //   })
                    //   .catch(console.log)
                    
                    
                }
            }
            
            export function editArticle(articleObj){
                return function(dispatch){
                    console.log("in redux update",articleObj )
                    
                    fetch(`http://localhost:5000/articles/${articleObj.id}`,{
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
                        dispatch({type: EDIT_POST, payload: newArticleObj})
            
            
        })
        .catch(console.log)

    }
}