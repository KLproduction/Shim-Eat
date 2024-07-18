import { AiOutlineLoading } from "react-icons/ai";

const MySpinner = () => {
  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 animate-spin text-6xl text-green-500">
      <AiOutlineLoading />
    </div>
  );
};

export default MySpinner;
