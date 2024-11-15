import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Feather, FilePen, Globe, Layers, NotebookPen } from 'lucide-react';
import lamp from '../../../public/auth.png'

const DashboardStats = () => {
  return (
    <div className="m-4 mx-1.5 lg:mx-8 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-2">
      <Card className="bg-accent border-none">
        <CardContent>
          <NotebookPen  className="h-8 w-8 text-primary" />
          <div className="text-2xl font-medium">10</div>
          <div className="text-gray-500">Total Blogs</div>
        </CardContent>
      </Card>
      <Card className="bg-accent border-none">
        <CardContent>
          <Feather className="h-8 w-8 text-primary" />
          <div className="text-2xl font-medium">20</div>
          <div className="text-gray-500">Total Essays</div>
        </CardContent>
      </Card>
      <Card className="bg-accent border-none">
        <CardContent>
          <Globe className="h-8 w-8 text-primary" />
          <div className="text-2xl font-medium">5,342</div>
          <div className="text-gray-500">Total Projects Deployed</div>
        </CardContent>
      </Card>
    
    </div>
  );
};

export default DashboardStats;