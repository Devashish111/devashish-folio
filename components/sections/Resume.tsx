"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Resume() {
  const fallbackUrl = "/resume.pdf";
  const backendUrl = "https://pfolio-backend.onrender.com/resume.pdf";

  const [resumeUrl, setResumeUrl] = useState(fallbackUrl);

  useEffect(() => {
    let isMounted = true;

    const checkBackend = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2500);

        const res = await fetch(backendUrl, {
          method: "GET", // IMPORTANT: use GET not HEAD
          signal: controller.signal,
        });

        clearTimeout(timeout);

        // Only switch if response is truly valid
        if (res.ok && isMounted) {
          setResumeUrl(backendUrl + "?t=" + Date.now());
        }
      } catch {
      }
    };

    // Always start with fallback
    setResumeUrl(fallbackUrl);

    // First attempt
    checkBackend();

    // 🔄 Retry once after backend wakes up (important for cold start)
    const retry = setTimeout(checkBackend, 5000);

    return () => {
      isMounted = false;
      clearTimeout(retry);
    };
  }, []);

  return (
    <section id="resume" className="scroll-mt-16 bg-muted/30 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Resume
              </h2>
              <Separator className="mt-4" />
            </div>

            <a
              href={resumeUrl}
              download
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80"
            >
              <Download className="size-4" />
              Download PDF
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 overflow-hidden rounded-xl border bg-background shadow-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          {/* iframe ALWAYS safe */}
          <iframe
            src={resumeUrl}
            title="Resume"
            className="hidden h-[85vh] w-full sm:block sm:h-[90vh]"
          />

          <div className="flex flex-col items-center gap-4 px-6 py-16 text-center sm:hidden">
            <p className="text-muted-foreground">
              PDF preview is not supported on most mobile browsers.
            </p>
            <a
              href={resumeUrl}
              download
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80"
            >
              <Download className="size-4" />
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}