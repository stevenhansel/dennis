import clsx from 'clsx';
import Image from 'next/image';
import type { Episode } from '../../../types/model';

type Props = {
    episode: Episode,
    className?: string,
    onClick?: () => void,
};

const EpisodeCard = (props: Props) => {
  const { episode, className, onClick } = props;

  return (
    <div 
      className={clsx("flex flex-col w-full", className)}
      onClick={() => {
        if (onClick) {
            onClick();
        }
      }} 
    >
      {episode.thumbnailUrl ? (
        <div className='relative w-full h-64 md:w-1/2 md:h-2/3'>
          <Image
            alt={episode.id.toString()}
            src={episode.thumbnailUrl}
            layout="responsive"
            width="39%"
            height="29%"
            quality={100}
          />
        </div>
      ) : null}

      <div className="ml-2 mt-1 text-white">
        <h1 className="text-2xl">{episode.episode}. {episode.episodeName}</h1>
        <div className='text-sm'>{new Date(episode.episodeDate).toUTCString()}</div>

        {episode.releasedSong !== null ? (
          <div className="">{episode.releasedSong.songNameJp} - {episode.releasedSong.artistNameJp}</div>
        ) : null}
      </div>
    </div>
  );
};

export default EpisodeCard;