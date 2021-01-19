import React, {useEffect, useReducer} from 'react'
import {useParams} from 'react-router-dom';
import {apiGet} from '../misc/config';


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

const initialState = {
    show: null,
    isLoading: true,
    error: null,
}

const Show = () =>{

    const { id } = useParams()

    const [{show, isLoading, error},dispatch] = useReducer(reducer, initialState)

    // eslint-disable-next-line
    console.log(show);

    useEffect(() => {

        const isMounted = true
        //  eslint-disable-next-line 
        // console.log(show);

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
            if(isMounted){

                dispatch({ type: 'FETCH_SUCCESS', show: results})

            }
        }).catch(err => {
            if(isMounted) {
                dispatch({ type: 'FETCH_FAILED', error: err.message})
            }
        })

    }, [id]);

    if(isLoading) {
        return <div>Data is being Loaded</div>
    }

    if(error) {
        return <div>Error occured: {error}</div>
    }

    return (
        <div>
           this is show page 
        </div>
    ) }

export default Show;
