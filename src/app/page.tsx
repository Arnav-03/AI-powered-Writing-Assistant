import HeroSection from "@/components/website/HeroSection";
import Layout from "@/components/website/Layout";
export default function HomePage() {
  return (
    <Layout>
      <div className="flex flex-col">
          <HeroSection />
      </div>
    </Layout>
  );
}
