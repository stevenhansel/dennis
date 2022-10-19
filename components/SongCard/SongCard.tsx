import clsx from "clsx";

type Props = {
  songJpName: string;
  songEnName?: string;
  artistJpName: string;
  artistEnName?: string;
  imageSrc: string;
  rank: number;
  actualEpisodeNumber?: number;
  numberOfVotes?: number;
  isVoted: boolean;
  onVote: () => void;

  className?: string;
};

const ArtistCard = (props: Props) => {
  const {
    songEnName,
    songJpName,
    artistJpName,
    artistEnName,
    imageSrc,
    rank,
    actualEpisodeNumber,
    numberOfVotes,
    isVoted,
    onVote,
    className = "",
  } = props;

  return (
    <div
      className={clsx("w-full flex items-center justify-between", className)}
    >
      <div className="flex">
        <div className="flex items-center w-16 mr-5">
          <h1 className="text-4xl">#{rank}</h1>
        </div>

        <div
          style={{
            width: 100,
            height: 100,
            marginRight: 12,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        </div>

        <div className="mt-1">
          <h1 className="text-2xl">
            {songEnName ? `${songEnName} [ ${songJpName} ]` : songJpName}
          </h1>
          <h2 className="text-xl">
            {artistEnName
              ? `${artistEnName} [ ${artistJpName} ]`
              : artistJpName}
          </h2>

          {actualEpisodeNumber !== undefined ? (
            <p>
              Released on episode{" "}
              <span className="font-medium">{actualEpisodeNumber}</span>
            </p>
          ) : null}
        </div>
      </div>

      <div>
        {!isVoted ? (
          <button onClick={onVote} className="rounded-full bg-red">VOTE</button>
        ) : null}

        {numberOfVotes !== undefined && isVoted ? (
          <h3 className="text-4xl">{numberOfVotes}</h3>
        ) : null}
      </div>
    </div>
  );
};

export default ArtistCard;
