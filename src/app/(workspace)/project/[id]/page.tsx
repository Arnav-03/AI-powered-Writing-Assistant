"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Wand2,
  SaveAll,
  FileDown,
  MessageSquarePlus,
  RefreshCw,
  Sparkles,
  Type,
  Languages,
  ListTree,
  PenTool,
  BookOpen,
  Palette,
  ScrollText,
} from "lucide-react";
import Layout from "@/components/website/Layout";
import TitleName from "@/components/website/TitleName";
import { getProjectDetailsById } from "@/lib/appwrite";
import { useParams } from "next/navigation";
import { Models } from "node-appwrite";
import AIAssistantSidebar from "@/components/website/AISidebar";

// Define the params type
type Params = {
  id: string;
};

const Editor = () => {
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [project, setProject] = useState<Models.Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);
 

  // Use type assertion for params
  const params = useParams() as Params;
  const id = params.id;

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return; // Early return if id is not available

      try {
        const result = await getProjectDetailsById(id);
        if (result.success && result.data) {
          setProject(result.data);
        }
      } catch (err) {
        console.log("Error fetching project");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    const words = content
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
  }, [content]);

 

  return (
    <Layout>
      <div className="min-h-screen p-4 mt-[70px]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Editor */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="border-2">
              <CardHeader className="flex flex-col lg:flex-row items-start justify-between space-y-2 pb-4">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold">
                    <TitleName
                      isLoading={isLoading}
                      title={project?.type || ""}
                      type={project?.title}
                    />
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="py-2" variant="secondary">
                    {wordCount} words
                  </Badge>
                  <Button variant="outline" size="sm">
                    <SaveAll className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileDown className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-2">
                  <Textarea
                    placeholder="Start writing your content here..."
                    className="min-h-[325px] resize-none border-0 focus-visible:ring-0"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <AIAssistantSidebar
            title={project?.type || ""}
            textContent={content}
            type={project?.title || ""}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Editor;
