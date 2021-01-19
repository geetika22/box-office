/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-underscore-dangle */
import React, {useEffect, useReducer} from 'react'
import {useParams} from 'react-router-dom';
import Cast from '../components/shows/Cast';
import Details from '../components/shows/Details';
import Seasons from '../components/shows/Seasons';
import ShowMainData from '../components/shows/ShowMainData';
import {apiGet} from '../misc/config';
import { InfoBlock, ShowPageWrapper } from './Show.styled';


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
        <ShowPageWrapper>
           <ShowMainData image={show.image}
            name={show.name} 
            rating={show.rating} 
            summary={show.summary} 
            tags={show.genres} />
           <InfoBlock>
               <h2>Details</h2>
               <Details status={show.status} 
               network={show.network}
               premiered={show.premiered}/>
           </InfoBlock>
           <InfoBlock>
               <h2>Seasons</h2>
               <Seasons seasons={show._embedded.seasons}
               />
           </InfoBlock>
           <InfoBlock>
               <h2>Cast</h2>
               <Cast cast={show._embedded.cast}
               />
           </InfoBlock>
        </ShowPageWrapper>
    ) }

export default Show;
