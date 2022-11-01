import clsx from "clsx";

type Props = {
  songNameJp: string;
  songNameEn: string;
  artistNameJp: string;
  artistNameEn: string;
  imageSrc: string;
  onClick: () => void;
  className?: string;
};

const SongDetail = (props: Props) => {
  const {
    artistNameJp,
    artistNameEn,
    songNameJp,
    songNameEn,
    imageSrc,
    onClick,
    className = "",
  } = props;

  return (
    <div
      onClick={onClick}
      className={clsx("rounded-xl w-full flex flex-col  items-center h-96 justify-between pb-2 bg-gray-700 shadow-md", className)}
    >
      <div className="relative w-full h-full">
        <div className="absolute top-0 rounded-t-xl flex w-full h-full bg-gradient-to-t from-gray-700 z-20" />
        <div
          className="flex rounded-t-xl w-full h-full bg-cover bg-center bg-no-repeat z-10"
          style={{
            backgroundImage: `url(${imageSrc})`,
          }}
        />
      </div>
      <div className="pt-2">
        <h2 className="text-sm md:text-xl">
          {songNameEn} {' '}
          [{songNameJp}]
        </h2>
        <h2 className="text-sm md:text-xl">
          {artistNameEn} {' '}
          [{artistNameJp}]
        </h2>
      </div>
    </div>
  );
};

export default SongDetail;
