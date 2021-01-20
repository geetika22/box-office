import React, {useState} from 'react'
import ActorGrid from '../components/actors/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrids from '../components/shows/ShowGrids';
import { useLastQuery } from '../misc/Custom-hooks';
import { SearchInput,RadioInputsWrapper,SearchButtonWrapper } from './Home.styled';

import CustomRadio from '../components/CustomRadio';

const Home = () => {
    const [input, setInput] = useLastQuery();
    const [results, setResults] =useState(null);
    const [searchOption, setSearchOption] = useState('shows');

    const isSearchShows = searchOption==='shows';

    const onSearch = () => {
        fetch(`https://api.tvmaze.com/search/${searchOption}?q=${input}`)
        .then(r => r.json())
        .then(result => 
            {
                setResults(result);
            });
    }

    const onInputChange = (ev) => {
        setInput(ev.target.value) // This gives the values which is being typed inside the input box`
    };

    const onKeyDown = (ev) => {
        if(ev.keyCode === 13) {
            onSearch()
        }
    };

    const renderResults = () => {
        if(results && results.length === 0) {
            return <div>No Results.</div>
        }
        if(results && results.length > 0) {
            return results[0].show ? (<ShowGrids data={results} />) : (<ActorGrid data={results}/>);
        }
        return null;
    };

    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value)
    }

    return (
        <MainPageLayout>
            <SearchInput type="text" placeholder="Search for something" onChange={onInputChange} onKeyDown={onKeyDown} value={input}/>
            <RadioInputsWrapper>
                <div>
                <CustomRadio label="Shows" id='shows-search' value='shows'checked={isSearchShows} onChange={onRadioChange}/>
                </div>
                <div>
                <CustomRadio label="Actors" id='actors-search' value='people'checked={!isSearchShows} onChange={onRadioChange}/>
                </div>
            </RadioInputsWrapper>
            <SearchButtonWrapper>
            <button type="button" onClick={onSearch}>Search</button>
            </SearchButtonWrapper>
            {renderResults()}
        </MainPageLayout>
    )
}

export default Home
