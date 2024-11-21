import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollText, PenTool, ListTree, Sparkles, Palette } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import genie from "../../../public/loading.png"
import Image from "next/image";

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
  const [style, setStyle] = useState(""); 
  const [rephraseMode, setRephraseMode] = useState("academic");
  const [targetLanguage, setTargetLanguage] = useState("spanish");

  const handleToolSelect = async (toolId: string, selectedText: string) => {
    setLoading(true);
    console.log("Selected Tool:", toolId);
    console.log("Selected Text:", selectedText);

    try {
      switch (toolId) {
        case "generate":
          const generateRes = await fetch("/api/gemini/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic: title, type }),
          });

          if (generateRes.ok) {
            const data = await generateRes.json();
            setResponse(data.content);
          } else {
            const errorData = await generateRes.json();
            console.error("Error:", errorData.error);
            setResponse("Error generating content. Try again.");
          }
          break;

        case "rephrase":
          const rephraseRes = await fetch("/api/gemini/rephrase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              text: selectedText, 
              mode: rephraseMode 
            }),
          });

          if (rephraseRes.ok) {
            const data = await rephraseRes.json();
            setResponse(data.rephrased);
          } else {
            const errorData = await rephraseRes.json();
            console.error("Error:", errorData.error);
            setResponse("Error rephrasing content. Try again.");
          }
          break;

        case "restructure":
          const restructureRes = await fetch("/api/gemini/restructure", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: selectedText }),
          });

          if (restructureRes.ok) {
            const data = await restructureRes.json();
            setResponse(data.restructured);
          } else {
            const errorData = await restructureRes.json();
            console.error("Error:", errorData.error);
            setResponse("Error restructuring content. Try again.");
          }
          break;

        case "translate":
          const translateRes = await fetch("/api/gemini/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              text: selectedText, 
              targetLanguage 
            }),
          });

          if (translateRes.ok) {
            const data = await translateRes.json();
            setResponse(data.translated);
          } else {
            const errorData = await translateRes.json();
            console.error("Error:", errorData.error);
            setResponse("Error translating content. Try again.");
          }
          break;

        case "tone":
          const toneRes = await fetch("/api/gemini/style", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              selectedText, 
              style 
            }),
          });

          if (toneRes.ok) {
            const data = await toneRes.json();
            setResponse(data.content);
          } else {
            const errorData = await toneRes.json();
            console.error("Error:", errorData.error);
            setResponse("Error adjusting tone. Try again.");
          }
          break;

        case "outline":
          const outlineRes = await fetch("/api/gemini/outline", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic: title }),
          });

          if (outlineRes.ok) {
            const data = await outlineRes.json();
            setResponse(data.outline);
          } else {
            const errorData = await outlineRes.json();
            console.error("Error:", errorData.error);
            setResponse("Error generating outline. Try again.");
          }
          break;
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("An unexpected error occurred.");
    } finally {
      setLoading(false);
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
          <Textarea readOnly value={selectedText} className="h-[100px] mb-4" />
          <label className="text-sm mb-2 block">Choose Rephrasing Mode:</label>
          <Select 
            value={rephraseMode} 
            onValueChange={setRephraseMode}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Rephrasing Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      id: "translate",
      title: "Translate Content",
      description: "Translate to different languages",
      icon: Palette,
      content: (
        <div>
          <p className="text-sm mb-2">Selected Text:</p>
          <Textarea readOnly value={selectedText} className="h-[100px] mb-4" />
          <label className="text-sm mb-2 block">Choose Target Language:</label>
          <Select 
            value={targetLanguage} 
            onValueChange={setTargetLanguage}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="arabic">Arabic</SelectItem>
            </SelectContent>
          </Select>
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
          <Textarea readOnly value={selectedText} className="h-[100px] mb-4" />
          <label htmlFor="tone-style" className="text-sm mb-2 block">
            Choose a style:
          </label>
          <input
            id="tone-style"
            type="text"
            placeholder="e.g., Formal, Casual"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full border rounded p-2 text-sm"
          />
          <p className="text-xs mt-2">
            Selected Style: <strong>{style}</strong>
          </p>
        </div>
      ),
    },
  ];


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
              {/*               <h2 className="text-lg font-bold mb-4">Genie is thinking...</h2>
               */}{" "}
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
                <div className="h-[200px] flex items-center justify-center bg-gray-200 animate-pulse rounded-md">
                  <Image
                    priority
                    height={100}
                    src={genie}
                    alt="genie"
                    className="floating genie-image"
                  />
                  <div className="loader mt-[-30px] ml-[-75px] h-[75px]"></div>
                </div>
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
