"use client"
import Layout from "@/components/website/Layout";
import { useUser } from "@/app/hooks/useUser";
import WelcomeMessage from "@/components/website/WelcomeMessage";
import DashboardStats from "@/components/website/DashboardStats";
export default function Dashboard() {
  const { user, loading } = useUser();

  return (
    <Layout>
       <WelcomeMessage user={user}/>
       <DashboardStats/>
    </Layout>
  );
}
