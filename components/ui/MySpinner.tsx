import { AiOutlineLoading } from "react-icons/ai";

const MySpinner = () => {
  return (
    <div className="w-full h-full bg-white/75 backdrop-blur-lg flex justify-center items-center">
      <div className="flex justify-center items-center fixed inset-0 z-50 animate-spin text-6xl text-green-500">
        <AiOutlineLoading />
      </div>
    </div>
  );
};

export default MySpinner;
