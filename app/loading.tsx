"use client";

import MySpinner from "@/components/ui/MySpinner";

const loading = () => {
  return (
    <div className=" w-full h-full flex flex-col justify-center items-center">
      <div>{<MySpinner />}</div>
    </div>
  );
};

export default loading;
