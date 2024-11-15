"use client"
import Layout from "@/components/website/Layout";
import { useUser } from "@/app/hooks/useUser";
import NewProjectButton from "@/components/website/NewProjectButton";
export default function Dashboard() {
  const { user, loading } = useUser();

  return (
    <Layout>
        <div className="mt-[90px]"></div>
       <NewProjectButton/>
    </Layout>
  );
}
