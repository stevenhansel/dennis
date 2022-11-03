import clsx from "clsx";
import Image from "next/image";
import type { Episode } from "../../../types/model";

type Props = {
  episode: Episode;
  className?: string;
  onClick?: () => void;
};

const EpisodeCard = (props: Props) => {
  const { episode, className, onClick } = props;

  return (
    <div
      className={clsx("flex w-full", className)}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {episode.thumbnailUrl ? (
        <>
          <div className="relative block md:hidden">
            <Image
              alt={episode.id.toString()}
              src={episode.thumbnailUrl}
              layout="fixed"
              width="148px"
              height="111px"
              quality={100}
            />
          </div>
          <div className="relative hidden md:block">
            <Image
              alt={episode.id.toString()}
              src={episode.thumbnailUrl}
              layout="fixed"
              width="268px"
              height="201px"
              quality={100}
            />
          </div>
        </>
      ) : null}

      <div className="h-[111px] md:h-[201px] text-white font-light bg-slate-700/[.4] w-full">
        <div className="mt-1 ml-3 sm:ml-5">
          <div className="flex items-center">
            <h1 className="mt-0 md:mt-2 text-sm md:text-xl font-semibold mb-1">
              {episode.episode}.{" "}
              {episode.episodeName ? episode.episodeName : "???"}
            </h1>
          </div>

          <div className="text-xs md:text-base">
            {new Date(episode.episodeDate).toLocaleString()}
          </div>

          <p className="text-xs md:text-base mt-0.5">
            {episode.numOfVotesCasted} votes casted
          </p>

          <div>
            {episode.releasedSong !== null ? (
              <>
                <div className="flex items-center mt-1 md:mt-3">
                  <div
                    className="w-[35px] md:w-[45px] h-[35px] md:h-[45px] overflow-hidden rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${episode.releasedSong.coverImageUrl})`,
                    }}
                  />

                  <div className="ml-2 text-xs md:text-sm">
                    <p>{episode.releasedSong.songNameJp}</p>
                    <p>{episode.releasedSong.artistNameJp}</p>
                  </div>
                </div>

                <div className="flex items-center ml-2 mt-3">
                  {episode.releasedSong.youtubeUrl ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={episode.releasedSong.youtubeUrl}
                      className="relative hidden md:block mr-3 hover:cursor-pointer"
                    >
                      <Image
                        alt={episode.id.toString()}
                        src={"/youtube.png"}
                        layout="fixed"
                        width="30px"
                        height="30px"
                        quality={100}
                      />
                    </a>
                  ) : null}

                  {episode.releasedSong.spotifyUrl ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={episode.releasedSong.spotifyUrl}
                      className="relative hidden md:block hover:cursor-pointer"
                    >
                      <Image
                        alt={episode.id.toString()}
                        src={"/spotify.png"}
                        layout="fixed"
                        width="23px"
                        height="23px"
                        quality={100}
                      />
                    </a>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
