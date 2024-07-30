import { useRouter, NextRouter } from "next/router";

interface HeaderButtonProps {
  link: string;
  value: string;
  responsive: boolean;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  link,
  responsive,
  value,
}) => {
  const router: NextRouter = useRouter();

  const handleRouter = () => {
    router.push(link);
  };

  return (
    <div>
      {responsive ? (
        <button
          onClick={handleRouter}
          className="md:w-auto text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-md font-bold px-4 py-2 text-center cursor-pointer"
        >
          {value}
        </button>
      ) : (
        <button
          onClick={handleRouter}
          className=" md:w-auto text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-md font-bold px-4 py-2 text-center cursor-pointer"
        >
          {value}
        </button>
      )}
    </div>
  );
};

export default HeaderButton;
