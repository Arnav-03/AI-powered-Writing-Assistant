import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Briefcase,
  Feather,
  FilePen,
  FileText,
  Globe,
  Layers,
  NotebookPen,
} from "lucide-react";
import lamp from "../../../public/auth.png";

const DashboardStats = () => {
  return (
    <div className="m-4 mx-1.5 lg:mx-8 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-2">
      <Card className="bg-accent border-none ">
        <CardContent className="py-4 pt-5">
          <div
            className="flex justify-between items-center
           "
          >
            <div className="flex ">
              <FileText className="h-10 w-10 lg:h-14 lg:w-14 text-primary mr-2" />
              <div className="text-gray-500 uppercase">
                <div className="text-sm lg:text-lg font-extralight">Total</div>
                <div className="font-extrabold text-md lg:text-xl  text-foreground/80">
                  Blogs
                </div>
              </div>
            </div>
            <div className="text-2xl lg:text-3xl  font-extrabold">10</div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-accent border-none ">
        <CardContent className="py-4 pt-5">
          <div
            className="flex justify-between items-center
           "
          >
            <div className="flex ">
              <BookOpen className="h-10 w-10 lg:h-14 lg:w-14 text-primary mr-2" />
              <div className="text-gray-500 uppercase">
              <div className="text-sm lg:text-lg">Total</div>
              <div className="font-extrabold text-md lg:text-xl  text-foreground/80">
                  Essays
                </div>
              </div>
            </div>
            <div className="text-2xl lg:text-3xl  font-extrabold">10</div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-accent border-none ">
        <CardContent className="py-4 pt-5">
          <div
            className="flex justify-between items-center
           "
          >
            <div className="flex ">
              <Globe className="h-10 w-10 lg:h-14 lg:w-14 text-primary mr-2" />
              <div className="text-gray-500 uppercase">
              <div className="text-sm lg:text-lg">Projects</div>
                <div className="font-extrabold text-md lg:text-xl  text-foreground/80">
                  Deployed
                </div>
              </div>
            </div>
            <div className="text-2xl lg:text-3xl  font-extrabold">10</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
