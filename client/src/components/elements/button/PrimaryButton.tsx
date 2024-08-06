interface PrimaryButtonProps {
  value: string;
  onChanger?: any;
  place?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  value,
  onChanger,
  place,
}) => {
  return (
    <>
      {place === "design" ? (
        <button
          onClick={onChanger}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 rounded-lg text-md font-bold px-5 py-1.5 text-center ml-2 "
        >
          {value}
        </button>
      ) : place === "big" ? (
        <button
          onClick={onChanger}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 rounded-lg text-md font-bold px-6 py-3 text-center "
        >
          {value}
        </button>
      ) : (
        <div className="text-right">
          <button
            onClick={onChanger}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 rounded-lg text-md font-bold px-4 py-2 text-center ml-2 "
          >
            {value}
          </button>
        </div>
      )}
    </>
  );
};

export default PrimaryButton;
