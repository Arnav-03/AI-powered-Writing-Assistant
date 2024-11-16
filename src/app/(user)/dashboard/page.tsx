"use client"
import Layout from "@/components/website/Layout";
import { useUser } from "@/app/hooks/UserContext";
import WelcomeMessage from "@/components/website/WelcomeMessage";
import DashboardStats from "@/components/website/DashboardStats";
import NewProjectButton from "@/components/website/NewProjectButton";
export default function Dashboard() {
  const { user, loading } = useUser();

  return (
    <Layout>
       <WelcomeMessage user={user}/>
       <NewProjectButton/>
       <DashboardStats/>
    </Layout>
  );
}
