import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import GalleryPreview from "../components/GalleryPreview";

export default function Home() {
  return (
    <div className="bg-[#FDF6EF] min-h-screen font-['DM_Sans']">
      <Navbar />
      <Hero />
      <Stats />
      <GalleryPreview />
    </div>
  );
}
