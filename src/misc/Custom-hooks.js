import {useReducer, useEffect, useState} from 'react';
import {apiGet} from "./config"

function showsReducer(prevState, action) {
    switch(action.type) {

        case 'ADD': {
            return [...prevState, action.showId]
        }

        case 'REMOVE': {
            return prevState.filter((showId) => showId !== action.showId)
        }

        default: return prevState;
    }
}

function usePersistedReducer(reducer, initialState, key) {
    
    const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
        const persisted = localStorage.getItem(key);

        return persisted ? JSON.parse(persisted) : initial;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))

    }, [state, key])

    return [state, dispatch];
}

export function useShows(key='shows') {
    return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key = 'lastQuery') {
    const [input, setInput] = useState(() => {
        const persisted = sessionStorage.getItem(key);

        return persisted ? JSON.parse(persisted) : "";
    });

    const setPersistedInput = (newState) => {
        setInput(newState);
        sessionStorage.setItem(key, JSON.stringify(newState))
    }

    return [input, setPersistedInput]
}

const reducer = (previousState, action) => {
    switch(action.type){

        case 'FETCH_SUCCESS': {
            return  {isLoading: false, show: action.show, error: null}
        }

        case 'FETCH_FAILED': {
            return {...previousState, isLoading: false, error: action.error}
        }

        default : return previousState
    }
}


export function useShow(showId) {
    const [state,dispatch] = useReducer(reducer, {
        show: null,
        isLoading: true,
        error: null,
    })


    useEffect(() => {

        const isMounted = true
        //  eslint-disable-next-line 
        // console.log(show);

        apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`).then(results => {
            if(isMounted){

                dispatch({ type: 'FETCH_SUCCESS', show: results})

            }
        }).catch(err => {
            if(isMounted) {
                dispatch({ type: 'FETCH_FAILED', error: err.message})
            }
        })

    }, [showId]);

    return state;
}