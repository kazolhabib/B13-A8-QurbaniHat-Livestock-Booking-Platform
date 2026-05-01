import Image from "next/image";
import Hero from "@/components/Hero";
import FeaturedAnimals from "@/components/FeaturedAnimals";
import QurbaniGuide from "@/components/QurbaniGuide";
import WhyOurCattle from "@/components/WhyOurCattle";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedAnimals />
      <QurbaniGuide />
      <WhyOurCattle />
    </> 
  );
}
