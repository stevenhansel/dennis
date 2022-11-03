import { Countdown } from "../../molecules";

type Props = {
  date: Date;
  numOfSubscribers: number;
};

const InformationHeader = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center pt-4">
      <Countdown date={props.date} />

      <p className="mt-4 text-white">{props.numOfSubscribers} devil hunters are lurking</p>
    </div>
  );
};

export default InformationHeader;
