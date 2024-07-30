interface DeleteButtonProps {
  value: string;
  place?: string;
  onClicker?: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  value,
  place,
  onClicker,
}) => {
  return (
    <div className={place === "left" ? "text-left" : "text-right"}>
      <button
        onClick={onClicker}
        className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-md px-4 py-2 text-center "
      >
        {value}
      </button>
    </div>
  );
};

export default DeleteButton;
