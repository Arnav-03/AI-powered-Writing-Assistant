import React from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
const NewProjectButton = () => {
  return (
    <div className="w-full  flex justify-end   pr-2 my-4 lg:pr-8 ">
      <Button className="bg-primary/80" size={"lg"}>
        <Plus className="h-10 w-10" /> New Project
      </Button>
    </div>
  );
};

export default NewProjectButton;
