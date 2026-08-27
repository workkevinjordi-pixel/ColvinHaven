import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSplit from "@/components/FeatureSplit";
import Values from "@/components/Values";
import Drawing from "@/components/Drawing";
import Gallery from "@/components/Gallery";
import Quote from "@/components/Quote";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeatureSplit />
      <Values />
      <Drawing />
      <Gallery />
      <Quote />
      <Cta />
      <Footer />
    </>
  );
}
