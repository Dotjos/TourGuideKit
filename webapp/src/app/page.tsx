"use client"

import FeatureCarousel from "@/components/Features";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeatureCarousel/>
   </div>
  );
}
