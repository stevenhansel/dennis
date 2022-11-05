import { useState } from 'react';
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

  const [isEn, setIsEn] = useState(false);
  const songName = isEn && songNameEn ? songNameEn : songNameJp;
  const artistName = isEn && artistNameEn ? artistNameEn : artistNameJp;

  return (
    <button
      onClick={() => setIsEn(!isEn)}
      className={clsx("cursor-pointer rounded-xl w-full flex flex-col h-96 max-w-96 justify-between pb-2 bg-gray-700 shadow-md lg:w-128 lg:h-128 lg:max-w-none", className)}
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
      <div className="pt-2 pl-2 text-left lg:pl-8">
        <h2 className="text-sm md:text-xl lg:text-4xl">
          {songName}
        </h2>
        <h2 className="text-sm md:text-xl lg:text-3xl lg:py-2">
          {artistName}
        </h2>
      </div>
    </button>
  );
};

export default SongDetail;
