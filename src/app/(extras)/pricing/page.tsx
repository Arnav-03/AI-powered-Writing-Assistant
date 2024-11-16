"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import Layout from "@/components/website/Layout"
import { Check } from "lucide-react"
import { useState } from "react"

type PricingTier = {
  name: string
  price: {
    monthly: number
    yearly: number
  }
  description: string
  features: string[]
  highlighted?: boolean
  badge?: string
}

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  const pricingTiers: PricingTier[] = [
    {
      name: "Free",
      price: {
        monthly: 0,
        yearly: 0,
      },
      description: "Perfect for trying out our AI writing assistant",
      features: [
        "Up to 5,000 words per month",
        "Basic writing suggestions",
        "3 document exports",
        "Email support",
      ],
    },
    {
      name: "Pro",
      price: {
        monthly: 15,
        yearly: 144,
      },
      description: "Ideal for content creators and freelancers",
      features: [
        "Unlimited words",
        "Advanced writing suggestions",
        "Unlimited exports",
        "Priority email support",
        "Style customization",
        "Plagiarism checker",
      ],
      highlighted: true,
      badge: "Most Popular",
    },
    {
      name: "Team",
      price: {
        monthly: 49,
        yearly: 468,
      },
      description: "Best for teams and organizations",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Admin dashboard",
        "Custom templates",
        "API access",
        "24/7 phone support",
        "Advanced analytics",
      ],
    },
  ]

  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header Section */}
      <section className="container px-4 pt-24 pb-12 mx-auto text-center">
        <Badge className="mb-4" variant="secondary">
          Simple Pricing
        </Badge>
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
          Choose Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-foreground">
            Writing Plan
          </span>
        </h1>
        <p className="max-w-[42rem] mx-auto mb-8 text-xl text-muted-foreground">
          Get started for free or upgrade to unlock premium features.
          No hidden fees. Cancel anytime.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
            Monthly billing
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <span className={`text-sm ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
            Yearly billing
            <Badge variant="secondary" className="ml-2">
              Save 20%
            </Badge>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative ${
                tier.highlighted
                  ? "border-primary shadow-lg scale-105"
                  : "border-border"
              }`}
            >
              {tier.badge && (
                <Badge
                  className="absolute top-0 right-0 transform translate-x-2 -translate-y-2"
                  variant="default"
                >
                  {tier.badge}
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="flex flex-col gap-2">
                  <span className="text-2xl font-bold">{tier.name}</span>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold">
                      ${isYearly ? tier.price.yearly / 12 : tier.price.monthly}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  {isYearly && (
                    <span className="text-sm text-muted-foreground">
                      Billed ${tier.price.yearly} yearly
                    </span>
                  )}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.highlighted ? "default" : "outline"}
                >
                  {tier.name === "Free" ? "Get Started" : "Upgrade Now"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="container px-4 py-16 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              q: "Can I change plans anytime?",
              a: "Yes, you can upgrade, downgrade, or cancel your plan at any time."
            },
            {
              q: "Is there a free trial for paid plans?",
              a: "Yes, all paid plans come with a 14-day free trial. No credit card required."
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards, PayPal, and wire transfers for team plans."
            },
            {
              q: "Do you offer refunds?",
              a: "Yes, we offer a 30-day money-back guarantee for all paid plans."
            },
            {
              q: "Can I use the free plan forever?",
              a: "Yes, our free plan has no time limit and includes basic features."
            },
            {
              q: "Do you offer custom enterprise plans?",
              a: "Yes, contact our sales team for custom enterprise solutions."
            }
          ].map((faq, index) => (
            <Card key={index} className="border-none bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Money Back Guarantee */}
      <section className="container px-4 py-16 mx-auto text-center">
        <Card className="border-none bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-2xl font-bold">30-Day Money-Back Guarantee</h2>
            <p className="text-muted-foreground">
              Try any paid plan risk-free. If you're not completely satisfied, we'll refund your payment.
              No questions asked.
            </p>
            <Button variant="secondary" size="lg">
              View All Features
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
    </Layout>
  )
}