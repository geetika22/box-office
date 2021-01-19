import React from 'react'
import { SeasonList, SeasonsWrapper } from './Seasons.styled';

const Seasons = ({ seasons }) => (
      <SeasonsWrapper>
        <p>
          Seasons in total: <span>{seasons.length}</span>
        </p>
        <p>
          Episodes in total:{' '}
          <span>
            {seasons.reduce((acc, season) => acc + season.episodeOrder, 0)}
          </span>
        </p>
        <SeasonList>
          {seasons.map(season => (
            <div key={season.id} className='season-item'>
              <div className="left">
                <p>Season {season.number}</p>
                <p>
                  Episodes: <span>{season.episodeOrder}</span>
                </p>
              </div>
              <div>
                Aired:{' '}
                <span className='right'>
                  {season.premiereDate} - {season.endDate}
                </span>
              </div>
            </div>
          ))}
        </SeasonList>
      </SeasonsWrapper>
    );

export default Seasons