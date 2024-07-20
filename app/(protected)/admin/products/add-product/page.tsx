import { checkServerSession } from "@/actions/check-server-session";
import React, { useEffect } from "react";
import AddProductForm from "./_components/AddProductForm";

const addProductPage = async () => {
  await checkServerSession();

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <div className="overflow-auto">
        <AddProductForm />
      </div>
    </div>
  );
};

export default addProductPage;
