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
import { signUpWithEmail } from "@/lib/appwrite";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Layout from "@/components/website/Layout";
import Image from "next/image";
import Link from "next/link";
import { signUpWithGoogle } from "@/lib/oauth";

export default function SignupForm() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
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
    e.preventDefault();
    setLoading(true);

    // Validate form data
    if (!formData.name) {
      toast.error("Name is required");
      setLoading(false);
      return;
    }

    if (!formData.email) {
      toast.error("Email is required");
      setLoading(false);
      return;
    }

    if (!formData.password) {
      toast.error("Password is required");
      setLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const result = await signUpWithEmail(formData);
      if (result.success) {
        toast.success("Account created successfully", {
          description:
            "Your account has been created. You can now log in and start using the platform.",
        });
        router.push(`/dashboard`);
      } else {
        throw new Error(result.error || "Failed to create account");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setLoading(false);
      toast.error("Error creating account", {
        description:
          "There was a problem creating your account. Please try again later or contact support if the issue persists.",
      });
    }
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row mt-[150px]  ">
        {" "}
        <div className="flex w-full  mb-4  items-center justify-center p-4 ">
          <Image
            priority
            height={300}
            src={genie}
            alt="genie"
            className="floating genie-image h-[175px] lg:h-[300px] w-auto"
          />
          <div className="flex items-center justify-center p-2 notefont text-2xl   lg:text-3xl xl:text-4xl text-yellow-600">
            &quot; Welcome, wordsmith! <br /> Sign up to summon <br /> the genie
            and unlock endless
            <br /> writing inspiration! &quot;
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
              <div className="space-y-2">
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
                <Button onClick={handleSubmit} type="submit" className="w-full">
                  {isLoading ? (
                    <div className="spinner"></div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-background px-2 text-muted-foreground">
                      or
                    </span>
                  </div>
                </div>

                <Button
                  onClick={signUpWithGoogle}
                  variant="outline"
                  className="w-full flex gap-2"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="currentColor"
                  >
                    <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path>
                  </svg>
                  Sign up with Google
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account? 
                  <Link href="/login" className="text-primary hover:underline ml-1">
                    Login
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
