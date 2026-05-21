import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AbacusSection from "@/components/AbacusSection";
import ProgramsSection from "@/components/ProgramsSection";
import StatsSection from "@/components/StatsSection";
import VideoSection from "@/components/VideoSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AbacusSection />
        <ProgramsSection />
        <StatsSection />
        <VideoSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
