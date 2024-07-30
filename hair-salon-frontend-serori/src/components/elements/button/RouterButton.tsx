import { useRouter, NextRouter } from "next/router";

interface RouterButtonProps {
  link?: string;
  query?: any;
  value?: string;
  pxValue?: number;
  pyValue?: number;
  onChanger?: () => void;
  onChangeAndRouter?: () => void;
}

const RouterButton: React.FC<RouterButtonProps> = ({
  link,
  onChanger,
  value,
  query,
  pxValue,
  pyValue,
  onChangeAndRouter,
}) => {
  const router: NextRouter = useRouter();

  const handleRouter = () => {
    if (link) {
      if (onChangeAndRouter) {
        onChangeAndRouter();
      }
      router.push(link);
    } else if (query) {
      router.push({
        pathname: link,
        query: query,
      });
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div>
      {link ? (
        <button
          onClick={handleRouter}
          className={`md:w-auto text-white bg-gradient-to-r from-cyan-500 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-100 dark:focus:ring-cyan-800 rounded-lg text-md font-bold
             ${pxValue ? "px-" + pxValue : "px-4"}  
          ${pyValue ? "py-" + pyValue : "py-2"}
           text-center cursor-pointer`}
        >
          {value ? value : "戻る"}
        </button>
      ) : (
        <button
          onClick={onChanger}
          className={`md:w-auto text-white bg-gradient-to-r from-cyan-500 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-100 dark:focus:ring-cyan-800 rounded-lg text-md font-bold ${
            pxValue ? "px-" + pxValue : "px-4"
          } ${pxValue ? "py-" + pxValue : "py-2"}
           text-center cursor-pointer`}
        >
          {value ? value : "戻る"}
        </button>
      )}
    </div>
  );
};

export default RouterButton;
