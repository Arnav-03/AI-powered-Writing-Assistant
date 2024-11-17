"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, BookOpen, Sparkles, Wand2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/website/Layout";
import CreatingProject from "@/components/website/CreatingProject";

interface ProjectData {
  title: string;
  type: string;
  description: string;
  tone: string;
  style: string;
  creativityLevel: number;
  keywords: string[];
  currentKeyword: string;
}

const initialProjectData: ProjectData = {
  title: "",
  type: "",
  description: "",
  tone: "",
  style: "",
  creativityLevel: 50,
  keywords: [],
  currentKeyword: "",
};

const NewProject: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [isGeneratingTitles, setIsGeneratingTitles] = useState<boolean>(false);
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);
  const [projectData, setProjectData] =
    useState<ProjectData>(initialProjectData);

  const handleGenerateTitles = (): void => {
    setIsGeneratingTitles(true);
    // Simulated API call for title generation
    setTimeout(() => {
      setSuggestedTitles([
        "The Ultimate Guide to Modern Development",
        "10 Revolutionary Approaches to Software Design",
        "Breaking Down Complex Systems: A Developer's Journey",
        "Innovation in Practice: Real-world Case Studies",
      ]);
      setIsGeneratingTitles(false);
    }, 1500);
  };

  const handleKeywordAdd = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && projectData.currentKeyword.trim()) {
      setProjectData({
        ...projectData,
        keywords: [...projectData.keywords, projectData.currentKeyword.trim()],
        currentKeyword: "",
      });
    }
  };

  const removeKeyword = (keyword: string): void => {
    setProjectData({
      ...projectData,
      keywords: projectData.keywords.filter((k) => k !== keyword),
    });
  };

  const renderStep = (): JSX.Element => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                className={`cursor-pointer transition-all hover:scale-105 duration-200 ${
                  projectData.type === "blog" ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setProjectData({ ...projectData, type: "blog" })}
              >
                <CardContent className="p-8 pb-2">
                  <div className="flex flex-col items-center space-y-1">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Blog Post</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Perfect for articles, tutorials, and thought leadership
                    </p>
                    {projectData.type === "blog" && (
                      <Badge className="bg-primary/10 text-primary">
                        Selected
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card
                className={`cursor-pointer transition-all hover:scale-105 duration-200 ${
                  projectData.type === "essay" ? "ring-2 ring-primary" : ""
                }`}
                onClick={() =>
                  setProjectData({ ...projectData, type: "essay" })
                }
              >
                <CardContent className="p-8 pb-2">
                  <div className="flex flex-col items-center space-y-1">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Essay</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Ideal for academic writing and in-depth analysis
                    </p>
                    {projectData.type === "essay" && (
                      <Badge className="bg-primary/10 text-primary">
                        Selected
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <div className="flex gap-2">
                  <Input
                    id="title"
                    placeholder="Enter your project title"
                    value={projectData.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setProjectData({ ...projectData, title: e.target.value })
                    }
                    className="flex-1"
                  />
                  <Button
                    variant="secondary"
                    onClick={handleGenerateTitles}
                    disabled={isGeneratingTitles}
                  >
                    {isGeneratingTitles ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4 mr-2" />
                    )}
                    Generate Ideas
                  </Button>
                </div>
                {suggestedTitles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <Label>Suggested Titles</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {suggestedTitles.map((title, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="justify-start h-auto py-2 px-4 text-left"
                          onClick={() =>
                            setProjectData({ ...projectData, title })
                          }
                        >
                          {title}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
            <div className="space-y-2 pt-4">
              <Label htmlFor="keywords">Keywords (Optional)</Label>
              <Input
                id="keywords"
                placeholder="Press Enter to add keywords"
                value={projectData.currentKeyword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProjectData({
                    ...projectData,
                    currentKeyword: e.target.value,
                  })
                }
                onKeyDown={handleKeywordAdd}
              />
              <div className="flex flex-wrap gap-2 pt-2">
                {projectData.keywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    onClick={() => removeKeyword(keyword)}
                  >
                    {keyword} ×
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div />;
    }
  };
  const [showCreatinProject, setShowCreatinProject] = useState(false);
  const handleNext = (): void => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setShowCreatinProject(true);
      console.log("Creating project:", projectData);
      router.push("/editor");
    }
  };

  return (
    <Layout>
      {!showCreatinProject ? (
        <div className="min-h-screen bg-background p-4 md:p-8 mt-[70px]">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Wand2 className="w-7 h-7" />
                  Create New Project
                </CardTitle>
                <CardDescription className="text-base">
                  Set up your writing project and let AI assist you in crafting
                  amazing content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center   justify-center mb-8">
                  {[1, 2, 3].map((stepNumber) => (
                    <div
                      key={stepNumber}
                      className="flex items-center w-full  "
                    >
                      <div
                        className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-colors duration-200 ${
                          stepNumber <= step
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {stepNumber}
                      </div>
                      {stepNumber < 3 && (
                        <div
                          className={`h-1 w-full   mx-2 transition-colors duration-200 ${
                            stepNumber < step ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {renderStep()}

                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={handleNext}
                    className="w-32 h-11"
                    disabled={step === 1 && !projectData.type}
                  >
                    {step === 3 ? "Create" : "Next"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <CreatingProject />
      )}
    </Layout>
  );
};

export default NewProject;
