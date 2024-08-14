import React from "react";
import { Button } from "./ui/button";

type CodeGeneratorProps = {
  code: string;
  onClick?: VoidFunction;
  setCode?: React.Dispatch<React.SetStateAction<string>>;
};

function CodeGenerator({ code, onClick }: CodeGeneratorProps) {
  return (
    <div className="flex justify-between gap-2">
      <div className="w-full bg-secondary flex justify-center items-center font-semibold rounded-md">
        {code}
      </div>
      <Button type="button" onClick={onClick}>
        Generate
      </Button>
    </div>
  );
}

export default CodeGenerator;
