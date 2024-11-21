import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollText, PenTool, ListTree, Sparkles, Palette } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { generateFromGemini } from "@/lib/Gemini";
import { Skeleton } from "../ui/skeleton";

interface AISidebarProps {
  title: string;
  type: string;
  textContent: string;
}

const AIAssistantSidebar: React.FC<AISidebarProps> = ({
  title,
  type,
  textContent,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [currentTool, setCurrentTool] = useState("");
  const [resultDialog, setResultDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleToolSelect = async (toolId: string, selectedText: string) => {
    console.log("Selected Tool:", toolId);
    console.log("Selected Text:", selectedText);

    // You can add specific logic for each tool here
    switch (toolId) {
      case "generate":
       /*  console.log("generating:", selectedText);
        const generatedContent = await generateFromGemini(title, type);
        console.log(generatedContent);
        setResponse(generatedContent); // Store the generated response
        break; */
        try {
            console.log("Generating:", title);
            const res = await fetch("/api/gemini", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ topic: title, type }),
            });
      
            if (res.ok) {
              const data = await res.json();
              setResponse(data.content);
            } else {
              const errorData = await res.json();
              console.error("Error:", errorData.error);
              setResponse("Error generating content. Try again.");
            }
          } catch (error) {
            console.error("Error:", error);
            setResponse("An unexpected error occurred.");
          } finally {
            setLoading(false);
          }
      case "rephrase":
        console.log("Rephrasing:", selectedText);
        break;
      case "translate":
        console.log("Translating:", selectedText);
        break;
      case "tone":
        console.log("Adjusting tone for:", selectedText);
        break;
      // ... handle other tools
    }
  };

  const handleToolClick = (toolId: string) => {
    const text = window.getSelection()?.toString() || "";
    if (text.length === 0 && toolId !== "generate" && toolId !== "outline") {
      toast.error("Please select text to use this tool.");
      return;
    }
    setSelectedText(text);
    setCurrentTool(toolId);
    setDialogOpen(true);
  };

  const handleGenerateClick = () => {
    handleToolSelect(currentTool, selectedText);
    setDialogOpen(false); // Close the current dialog box
    setResultDialog(true);
  };

  const handleCopyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      toast.success("Content copied to clipboard!");
    }
  };

  const toolboxItems = [
    {
      id: "generate",
      title: "Generate Full Content",
      description: "Generate complete essays or blog posts",
      icon: ScrollText,
      content: (
        <div>
          <h1 className="mb-4">{title}</h1>
        </div>
      ),
    },
    {
      id: "restructure",
      title: "Restructure Sentences",
      description: "Improve clarity and flow",
      icon: PenTool,
      content: (
        <div>
          <p className="text-sm mb-2">Selected Text:</p>
          <Textarea readOnly value={selectedText} className="h-[100px]" />
        </div>
      ),
    },
    {
      id: "outline",
      title: "Generate Outline",
      description: "Create headings and structure",
      icon: ListTree,
      content: (
        <div>
          <p className="text-sm mb-2">Enter your topic:</p>
          <Textarea placeholder="Enter the topic for the outline..." />
        </div>
      ),
    },
    {
      id: "rephrase",
      title: "Rephrase Content",
      description: "Multiple rephrasing options",
      icon: Sparkles,
      content: (
        <div>
          <p className="text-sm mb-2">Selected Text:</p>
          <Textarea readOnly value={selectedText} className="h-[100px]" />
        </div>
      ),
    },
    {
      id: "tone",
      title: "Adjust Tone",
      description: "Modify content tone and style",
      icon: Palette,
      content: (
        <div>
          <p className="text-sm mb-2">Selected Text:</p>
          <Textarea readOnly value={selectedText} className="h-[100px]" />
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Custom Dialog Box for Tools */}
      {dialogOpen && response === null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-lg shadow-lg p-4 w-96">
            <h2 className="text-lg font-bold mb-4">
              {toolboxItems.find((item) => item.id === currentTool)?.title}
            </h2>
            <div>
              {toolboxItems.find((item) => item.id === currentTool)?.content}
            </div>
            <div className="flex justify-end space-x-2 my-4">
              <Button variant="default" onClick={handleGenerateClick}>
                Generate
              </Button>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Custom Dialog Box for Generated Content */}
      {resultDialog &&
        (response ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-lg shadow-lg p-4 w-96">
              <h2 className="text-lg font-bold mb-4">Genie is thinking...</h2>
              <div className="mb-4">
                <Textarea readOnly value={response} className="h-[200px] " />
              </div>
              <div className="flex justify-end space-x-2 my-4">
                <Button variant="default" onClick={handleCopyResponse}>
                  Copy
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setResponse(null);
                    setResultDialog(false);
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-lg shadow-lg p-4 w-96">
              <div className="space-y-4">
                <div className="h-[200px] bg-gray-200 animate-pulse rounded-md"></div>
              </div>
            </div>
          </div>
        ))}

      {/* Main Card for Tools */}
      {!dialogOpen && response === null && (
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              {toolboxItems.map((tool) => (
                <Button
                  key={tool.id}
                  variant="outline"
                  className="w-full justify-start py-6"
                  onClick={() => handleToolClick(tool.id)}
                >
                  <tool.icon className="w-6 h-6 mr-2" />
                  <div className="flex flex-col items-start text-left gap-[2px]">
                    <span className="text-sm font-medium">{tool.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {tool.description}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIAssistantSidebar;
