import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import {apiGet} from '../misc/config';

const Show = () =>{

    const { id } = useParams()

    const [show, setShow] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const isMounted = true
        // eslint-disable-next-line 
        console.log(show);

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
            if(isMounted){
            setShow(results);
            setIsLoading(false);
            }
        }).catch(err => {
            if(isMounted) {
            setError(err.message);
            setIsLoading(false);
            }
        })

    }, [])

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

export default Show
