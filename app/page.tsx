import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Resume />
      <Contact />
    </>
  );
}
