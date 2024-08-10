import { motion } from "framer-motion";
import { AiOutlineLoading } from "react-icons/ai";

const MySpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
      <div className="animate-spin text-6xl text-green-500">
        <AiOutlineLoading />
      </div>
    </div>
  );
};

export default MySpinner;
