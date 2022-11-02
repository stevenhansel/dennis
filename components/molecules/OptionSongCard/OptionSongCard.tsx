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
    <div
      onClick={onSelect}
      className={clsx("rounded-xl items-center justify-between p-2 bg-gray-700 shadow-md hover:animate-bounce hover:bg-red-500", className, {
        "bg-red-500": selected
      })}
    >
      <h2 className="text-sm md:text-xl">
        {artistNameJp}
      </h2>
    </div>
  );
};

export default OptionSongCard;
