import clsx from 'clsx';

type Props = {
    className?: string;
    progress: number;
};

const ProgressBar = (props: Props) => {
    const { className, progress } = props;

    return (
        <div className={clsx("w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700", className)}>
            <div className="bg-orange-400 h-1.5 rounded-full dark:bg-orange-500" style={{ width: `${progress}%` }} />
        </div>
    );
};

export default ProgressBar;