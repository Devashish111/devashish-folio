"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";

export function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Hello, I&apos;m
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {siteConfig.name}
        </h1>
        <p className="mt-2 text-xl text-muted-foreground sm:text-2xl">
          {siteConfig.title}
        </p>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
          {siteConfig.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" onClick={() => scrollTo("#resume")}>
            <ArrowDown className="size-4" data-icon="inline-start" />
            View Resume
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollTo("#contact")}
          >
            <Mail className="size-4" data-icon="inline-start" />
            Contact Me
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
