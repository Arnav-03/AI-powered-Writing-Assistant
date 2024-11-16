// app/about/page.tsx
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Layout from "@/components/website/Layout"
import { Boxes, Brain, Edit, Sparkles, Wand2 } from "lucide-react"

// Feature type definition
type Feature = {
  title: string
  description: string
  icon: JSX.Element
}

export default function AboutPage() {
  // Features data
  const features: Feature[] = [
    {
      title: "Advanced AI Writing",
      description: "Leverage state-of-the-art language models to enhance your writing",
      icon: <Brain className="w-10 h-10" />,
    },
    {
      title: "Real-time Suggestions",
      description: "Get intelligent recommendations as you write",
      icon: <Sparkles className="w-10 h-10" />,
    },
    {
      title: "Style Customization",
      description: "Adapt to any writing style or tone",
      icon: <Wand2 className="w-10 h-10" />,
    },
  ]

  // Stats data
  const stats = [
    { value: "1M+", label: "Active Users" },
    { value: "10M+", label: "Documents Created" },
    { value: "99%", label: "Satisfaction Rate" },
  ]

  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 mt-[80px]">
      {/* Hero Section */}
      <section className="container px-4 pt-24 pb-12 mx-auto text-center">
        <Badge className="mb-4" variant="secondary">
          Revolutionizing Writing
        </Badge>
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
          Writing Assistant of the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-foreground">
            Future
          </span>
        </h1>
        <p className="max-w-[42rem] mx-auto mb-8 text-xl text-muted-foreground">
          Empowering creators with AI-powered writing tools that enhance creativity
          and streamline content creation.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="h-12 px-8">
            Try for Free
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8">
            See How It Works
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container px-4 py-16 mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden border-none bg-background/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 text-primary">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container px-4 py-16 mx-auto">
        <div className="grid gap-8 text-center md:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <h4 className="text-4xl font-bold text-primary">{stat.value}</h4>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container px-4 py-16 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center">How It Works</h2>
        <div className="relative">
          <div className="absolute left-0 w-px h-full -ml-px bg-border md:left-1/2" />
          <div className="space-y-12">
            {[
              {
                title: "Write Naturally",
                description: "Start writing in your natural style. Our AI adapts to you.",
                icon: <Edit />,
              },
              {
                title: "Get Smart Suggestions",
                description: "Receive real-time improvements for clarity and impact.",
                icon: <Sparkles />,
              },
              {
                title: "Export Anywhere",
                description: "Export your polished content to any platform.",
                icon: <Boxes />,
              },
            ].map((step, index) => (
              <div key={index} className="relative flex flex-col gap-6 md:flex-row md:gap-12">
                <div className="flex items-center justify-end md:w-1/2 md:text-right">
                  {index % 2 === 0 && (
                    <>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <div className="absolute left-0 w-4 h-4 transform -translate-x-1/2 rounded-full bg-primary md:left-1/2" />
                    </>
                  )}
                </div>
                <div className="flex items-center md:w-1/2">
                  {index % 2 === 1 && (
                    <>
                      <div className="absolute left-0 w-4 h-4 transform -translate-x-1/2 rounded-full bg-primary md:left-1/2" />
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-16 mx-auto text-center">
        <Card className="p-8 border-none bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="space-y-6">
            <h2 className="text-3xl font-bold">Ready to Transform Your Writing?</h2>
            <p className="text-muted-foreground">
              Join thousands of writers who've already elevated their content with our AI assistant.
            </p>
            <Button size="lg" className="h-12 px-8">
              Get Started
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
    </Layout>
  )
}