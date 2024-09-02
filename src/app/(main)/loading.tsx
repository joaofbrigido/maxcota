import { Loader } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div>
      <Loader className="animate-spin h-8 w-8 text-amber-500 m-auto" />
    </div>
  );
};

export default loading;
