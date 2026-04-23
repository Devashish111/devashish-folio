"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/lib/data";
import { Separator } from "@/components/ui/separator";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function About() {
  return (
    <section id="about" className="scroll-mt-16 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            About Me
          </h2>
          <Separator className="mt-4 mb-10" />
        </motion.div>

        <div className="grid gap-10 md:grid-cols-[280px_1fr] md:gap-14">
          {/* Profile photo */}
          <motion.div
            className="flex justify-center md:justify-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div className="relative size-56 overflow-hidden rounded-2xl bg-muted ring-1 ring-border md:size-64">
              <Image
                src={siteConfig.profileImage}
                alt={siteConfig.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 224px, 256px"
                unoptimized
              />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            className="flex flex-col justify-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            {siteConfig.bio.map((paragraph, i) => (
              <p
                key={i}
                className="leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
