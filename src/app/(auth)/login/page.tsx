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

  /* 
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
  }, [router]); */
  /* 
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
          description: "Welcome back to DecentraVerify. Redirecting to dashboard...",
        });
        setTimeout(() => router.push("/dashboard"), 1000);
      } else {
        throw new Error(result.error || "Failed to log in");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error logging in", {
        description: "Please check your credentials and try again. If the problem persists, contact support.",
      });
    } finally {
      setIsLoading(false);
    }
  }; */

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
            &quot; Ah, the master of <br /> words returns! Log in to <br />{" "}
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
              <form /* onSubmit={handleSubmit} */ className="space-y-4">
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
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
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
