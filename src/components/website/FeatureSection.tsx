import React from 'react';
import {
  Sparkles,
  Brain,
  Target,
  Clock,
  Palette,
  MessageCircle,
  TreePine,
  RefreshCw,
  Zap,
  BarChart3,
  Shield,
  FileText,
  Languages,
  Workflow,
  Settings2,
  Router,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FeatureSection = () => {
  const features = [
    {
      title: "AI-Powered Writing Assistant",
      description: "Get real-time suggestions, improvements, and creative ideas as you write",
      icon: <Brain className="w-12 h-12 text-primary" />,
      benefits: [
        "Smart sentence completion",
        "Style and tone recommendations",
        "Grammar and clarity improvements",
        "Creative idea generation"
      ]
    },
    /* {
      title: "Content Templates & Frameworks",
      description: "Start with proven structures for different types of content",
      icon: <TreePine className="w-12 h-12 text-primary" />,
      benefits: [
        "Blog post templates",
        "Essay frameworks",
        "Research paper outlines",
        "Content briefs"
      ]
    }, */
   /*  {
      title: "Smart Editor",
      description: "A powerful editor designed for productive writing",
      icon: <FileText className="w-12 h-12 text-primary" />,
      benefits: [
        "Distraction-free mode",
        "Auto-save functionality",
        "Version history",
        "Collaborative editing"
      ]
    }, */
    {
      title: "Style & Tone Control",
      description: "Maintain consistent voice throughout your content",
      icon: <Palette className="w-12 h-12 text-primary" />,
      benefits: [
        "Customizable writing styles",
        "Tone adjustment tools",
        "Audience-specific language"
      ]
    },
    {
      title: "Research Assistant",
      description: "Gather and organize information effortlessly",
      icon: <Target className="w-12 h-12 text-primary" />,
      benefits: [
        "Fact-checking assistance",
        "Research summarization"
      ]
    },
   /*  {
      title: "Performance Analytics",
      description: "Track and improve your writing metrics",
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
      benefits: [
        "Readability scores",
        "Writing productivity stats",
        "Engagement predictions",
      ]
    } */
  ];

  const highlights = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Save Time",
      description: "Write high-quality content in half the time with AI assistance"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Enhance Quality",
      description: "Improve your writing with smart suggestions and improvements"
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Stay Consistent",
      description: "Maintain consistent style and tone across all your content"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Quick Highlights */}
      <div className="py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="border-none shadow-none bg-primary/55">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {highlight.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Features */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Writing?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join and create better content faster with our AI writing assistant.
          </p>
          <Button  size="lg" className="min-w-[200px]">
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;