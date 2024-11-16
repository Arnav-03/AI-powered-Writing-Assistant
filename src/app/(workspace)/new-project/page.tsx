"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FileText, 
  BookOpen, 
  PenTool, 
  MessageSquare, 
  Target, 
  Sparkles, 
  ArrowLeft,
  Wand2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import Layout from '@/components/website/Layout';

const NewProject = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState({
    title: '',
    type: '',
    description: '',
    tone: '',
    audience: '',
    style: '',
    creativityLevel: 50,
    keywords: [],
    currentKeyword: ''
  });

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const handleKeywordAdd = (e: React.KeyboardEvent) => {
   /*  if (e.key === 'Enter' && projectData.currentKeyword.trim()) {
      setProjectData({
        ...projectData,
        keywords: [...projectData.keywords, projectData.currentKeyword.trim()],
        currentKeyword: ''
      });
    } */
  };

  const removeKeyword = (keyword: string) => {
    setProjectData({
      ...projectData,
      keywords: projectData.keywords.filter(k => k !== keyword)
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all hover:border-primary ${
                  projectData.type === 'blog' ? 'border-primary' : ''
                }`}
                onClick={() => setProjectData({ ...projectData, type: 'blog' })}
              >
                <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
                  <FileText className="w-8 h-8 text-primary" />
                  <h3 className="font-semibold">Blog Post</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Perfect for articles, tutorials, and thought leadership
                  </p>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all hover:border-primary ${
                  projectData.type === 'essay' ? 'border-primary' : ''
                }`}
                onClick={() => setProjectData({ ...projectData, type: 'essay' })}
              >
                <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
                  <BookOpen className="w-8 h-8 text-primary" />
                  <h3 className="font-semibold">Essay</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Ideal for academic writing and in-depth analysis
                  </p>
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
                <Input
                  id="title"
                  placeholder="Enter your project title"
                  value={projectData.title}
                  onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  placeholder="What would you like to write about?"
                  className="h-32"
                  value={projectData.description}
                  onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tone">Writing Tone</Label>
                <Select 
                  value={projectData.tone}
                  onValueChange={(value) => setProjectData({ ...projectData, tone: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Writing Style</Label>
                <Select 
                  value={projectData.style}
                  onValueChange={(value) => setProjectData({ ...projectData, style: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="narrative">Narrative</SelectItem>
                    <SelectItem value="descriptive">Descriptive</SelectItem>
                    <SelectItem value="analytical">Analytical</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                    <SelectItem value="expository">Expository</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>AI Creativity Level</Label>
              <div className="pt-2">
                <Slider
                  value={[projectData.creativityLevel]}
                  onValueChange={(value: any[]) => setProjectData({ ...projectData, creativityLevel: value[0] })}
                  max={100}
                  step={1}
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground pt-1">
                <span>Conservative</span>
                <span>Balanced</span>
                <span>Creative</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                placeholder="Press Enter to add keywords"
                value={projectData.currentKeyword}
                onChange={(e) => setProjectData({ ...projectData, currentKeyword: e.target.value })}
                onKeyDown={handleKeywordAdd}
              />
              <div className="flex flex-wrap gap-2 pt-2">
                {projectData.keywords.map((keyword) => (
                  <Badge 
                    key={keyword}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeKeyword(keyword)}
                  >
                    {keyword} ×
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Handle project creation
      console.log('Creating project:', projectData);
      router.push('/editor'); // Redirect to editor with the new project
    }
  };

  return (
    <Layout>
    <div className="min-h-screen bg-background p-8 mt-[70px]">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={handleBack}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="w-6 h-6" />
              Create New Project
            </CardTitle>
            <CardDescription>
              Set up your writing project and let AI assist you in crafting amazing content
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className="flex items-center"
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      stepNumber <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div 
                      className={`h-1 w-24 mx-2 ${
                        stepNumber < step ? 'bg-primary' : 'bg-muted'
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
                className="w-32"
              >
                {step === 3 ? 'Create' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </Layout>
  );
};

export default NewProject;