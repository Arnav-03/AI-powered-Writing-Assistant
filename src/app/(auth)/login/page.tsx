"use client";
import React, { useEffect, useState } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogIn, Briefcase, GraduationCap, Building2 } from "lucide-react";
import Layout from "@/components/website/Layout";
import Link from "next/link";
import { toast } from "sonner";
/* import { getLoggedInUser, loginWithEmail } from '@/lib/appwrite';
 */ import { useRouter } from "next/navigation";
import Image from "next/image";
import genie from "../../../../public/auth.png";
import { signUpWithGoogle } from "@/lib/oauth";
import { getLoggedInUser, loginWithEmail } from "@/lib/appwrite";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
    setError("");
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getLoggedInUser();
        if (user) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error checking user session:", error);
      }
    };

    checkUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const result = await loginWithEmail(formDataToSend);
      if (result.success) {
        toast.success("Login successful", {
          description:
            "Welcome back to WritinGenie. Redirecting to dashboard...",
        });
        setTimeout(() => router.push("/dashboard"), 1000);
      } else {
        toast.error(result.error || "");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error logging in", {
        description:
          "There was an issue logging in. Please check your credentials and try again. If the problem persists, contact support.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row mt-[150px]  ">
        <div className="flex w-full  mb-4  items-center justify-center p-4 ">
          <Image
            priority
            height={300}
            src={genie}
            alt="genie"
            className="floating genie-image h-[175px] lg:h-[300px] w-auto"
          />
          <div className="flex items-center justify-center p-2 notefont text-2xl    lg:text-3xl xl:text-4xl text-yellow-600">
            &quot; Ah, the master of <br /> Words returns! Log in to <br />{" "}
            unleash the genie&apos;s magic <br /> and let your creativity <br />{" "}
            soar! &quot;
          </div>
        </div>
        <div className="flex flex-col w-full mt-[-50px] p-4 items-center justify-center">
          <Card className="w-full max-w-md bg-background shadow-custom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LogIn className="h-6 w-6" />
                Login
              </CardTitle>
              <CardDescription>
                Welcome back! Log in to continue your magical writing journey!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
         
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="spinner"></div>
                  ) : (
                    "Login"
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
                  Continue with Google
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
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
