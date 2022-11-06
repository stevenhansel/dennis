import { useEffect, useState } from 'react';

import { Countdown } from "../../molecules";

import { CurrentEpisode } from '../../../types/model';

type Props = {
  episode: CurrentEpisode;
  numOfSubscribers: number;
  withCountdown?: boolean;
};

const InformationHeader = (props: Props) => {
  const {
    episode,
    numOfSubscribers,
    withCountdown = false,
  } = props

  const [episodeDate, setEpisodeDate] = useState('')

  useEffect(() => {
    setEpisodeDate(new Date(episode.episodeDate).toLocaleString())
  }, [])

  return (
    <div className="pt-2 pb-3 px-1 md:px-2 text-bold w-full bg-gray-800 md:pt-8 md:pb-4">
        <div className="text-white font-bold text-xl md:text-3xl">
          Episode {episode.episode} {episode?.episodeName ? `- ${episode.episodeName}` : null} 
        </div>

        <div className="flex flex-col md:flex-row-reverse justify-between pt-2 md:pt-4">
          <div className="mb-1 md:mb-0">
            <div className="flex items-center">
              <div className="rounded-full bg-green-500 w-2 h-2 mr-2 mt-1" />
              <div>
                <span className="text-white text-sm md:text-base">{numOfSubscribers} devil hunter{numOfSubscribers > 1 ? 's' : ''} {numOfSubscribers > 1 ? 'are' : 'is'} lurking</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col mb-1 md:mb-0">
            <p className="text-white text-xs md:text-base mb-0.5 md:mb-1">{episodeDate}</p>
            {withCountdown ? (
              <Countdown className="mb-0.5 md:mb-1 text-xs" date={new Date(episode.episodeDate)} />
            ) : null}
          </div>
        </div>

        <p className="text-white text-center text-xs md:text-base mt-4 md:mt-6">{episode.numOfVotesCasted} votes has been casted</p>
      </div>
  );
};

export default InformationHeader;
