"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Briefcase, GraduationCap, Building2 } from "lucide-react";
import genie from "../../../../public/auth.png";
/* import { signUpWithEmail } from '@/lib/appwrite';
 */ import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Layout from "@/components/website/Layout";
import Image from "next/image";
import Link from "next/link";
export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    /*  e.preventDefault();

    try {
      const result = await signUpWithEmail(formData);

      if (result.success && result.otpSent) {
        // Redirect to OTP verification page with userId
        router.push(`/email-verify?userId=${result.userId}&role=${formData.role}`);
    } else {
        throw new Error(result.error || "Failed to create account");
    }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Error creating account", {
        description: "Please check your information and try again. If the problem persists, contact support.",
      });
    } */
  };

  return (
    <Layout>
  <div className="flex flex-col lg:flex-row mt-[150px]  ">      <div className="flex w-full  mb-4  items-center justify-center p-4 ">
          <Image
            height={300}
            src={genie}
            alt="genie"
            className="floating genie-image h-[200px] lg:h-[300px] w-auto"
          />
            <div className="flex items-center justify-center p-2 notefont text-3xl   lg:text-3xl xl:text-4xl text-yellow-600">
            &quot; Welcome, wordsmith! <br /> Sign up to summon <br /> the genie 
            and unlock  endless<br /> writing inspiration! &quot;
          </div>
        </div>
        <div className="flex flex-col w-full mt-[-50px] p-4 items-center justify-center">
          <Card className="w-full max-w-md bg-background shadow-custom ">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6" />
                Sign Up
              </CardTitle>
              <CardDescription>
              Create your account to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?
                  <Link
                    href="/login"
                    className="text-primary hover:underline"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
