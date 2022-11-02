import clsx from "clsx";

type Props = {
  songNameJp: string;
  songNameEn: string;
  artistNameJp: string;
  artistNameEn: string;
  imageSrc: string;
  className?: string;
};

const SongDetail = (props: Props) => {
  const {
    artistNameJp,
    artistNameEn,
    songNameJp,
    songNameEn,
    imageSrc,
    className = "",
  } = props;

  return (
    <div
      className={clsx("rounded-xl w-full flex flex-col  h-96 max-w-96 justify-between pb-2 bg-gray-700 shadow-md lg:h-5/6 lg:max-w-none", className)}
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
      <div className="pt-2 pl-2 text-center lg:pl-8 lg:text-left">
        <h2 className="text-sm md:text-xl lg:text-4xl">
          {songNameEn} {' '}
          [{songNameJp}]
        </h2>
        <h2 className="text-sm md:text-xl lg:text-3xl lg:py-2">
          {artistNameEn} {' '}
          [{artistNameJp}]
        </h2>
      </div>
    </div>
  );
};

export default SongDetail;
