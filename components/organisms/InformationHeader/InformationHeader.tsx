import { Countdown } from "../../molecules";

type Props = {
  date: Date;
  totalVotes: number;
  numOfSubscribers: number;
};

const InformationHeader = (props: Props) => {
  return (
    <div>
      <div></div>

      <div className="flex flex-col pt-4">
        <Countdown date={props.date} />

        <div className="flex items-center">
          <div className="rounded-full bg-green-500 w-2 h-2 mr-2" />
          <div>
            <span className="mt-4 text-white">{props.numOfSubscribers} devil hunter{props.numOfSubscribers > 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationHeader;
