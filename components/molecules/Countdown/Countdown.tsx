import { useCountdown } from '../../../hooks/useCountdown';

type Props = {
    date: Date
};

const Countdown = (props: Props) => {
  const remainingTime = useCountdown(new Date(props.date));

  return (
    <div key="toaster" className="text-white text-center pt-4">
      {remainingTime} before voting ends
    </div>
  )
};

export default Countdown;