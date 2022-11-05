import clsx from 'clsx';
import { useCountdown } from '../../../hooks/useCountdown';

type Props = {
    className?: string
    date: Date
};

const Countdown = (props: Props) => {
  const { className, date } =props;
  const remainingTime = useCountdown(date);

  return (
    <div key="toaster" className={clsx("text-white text-sm md:text-base", className)}>
      {remainingTime} before voting ends
    </div>
  )
};

export default Countdown;
