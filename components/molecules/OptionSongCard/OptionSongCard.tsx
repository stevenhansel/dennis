import clsx from "clsx";

type Props = {
  artistNameJp: string;
  selected: boolean;
  onSelect: () => void;
  className?: string;
};

const OptionSongCard = (props: Props) => {
  const {
    artistNameJp,
    onSelect,
    selected,
    className = "",
  } = props;

  return (
    <button
      onClick={onSelect}
      className={clsx("cursor-pointer rounded-xl items-center justify-between p-2 bg-gray-700 shadow-md hover:animate-bounce hover:bg-pochita-orange", className, {
        "bg-pochita-orange": selected
      })}
    >
      <h2 className="text-sm md:text-xl">
        {artistNameJp}
      </h2>
    </button>
  );
};

export default OptionSongCard;
