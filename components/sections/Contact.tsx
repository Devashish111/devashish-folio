"use client";

import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { siteConfig } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Send, Check } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";

const iconMap = {
  linkedin: LinkedinIcon,
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// Generate a unique GUID
function generateMessageId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

export function Contact() {
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    // Generate unique message ID
    const newMessageId = generateMessageId();

    // Setup SSE listener FIRST before sending the POST request
    const eventSource = new EventSource(
      `https://pfolio-backend.onrender.com/message/status/${newMessageId}`
    );

    eventSource.onopen = () => {
      // Fire and forget POST request AFTER SSE listener is ready
      fetch("https://pfolio-backend.onrender.com/message/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Message-ID": newMessageId,
        },
        body: JSON.stringify(body),
      }).catch((error) => {
        eventSource.close();
        toast.error("Failed to send message.", {
          description: "Please check your connection and try again.",
        });
      });
    };

    const handleMessage = (event: MessageEvent) => {
      try {
        console.log("SSE message received:", event.data);
        const data = JSON.parse(event.data);
        const statusCode = data.status;

        switch (statusCode) {
          case "sent":
            toast.success("Message sent!", {
              description: "Thanks for reaching out. I'll get back to you soon.",
            });
            setPending(false);
            eventSource.close();
            break;

          case "failed":
            toast.error("Failed to send message.", {
              description: data.error || "Please try again later.",
            });
            setPending(false);
            eventSource.close();
            break;

          case "error":
            toast.error("An error occurred.", {
              description: data.error || "Something went wrong.",
            });
            setPending(false);
            eventSource.close();
            break;

          default:
            console.warn("Unknown status code:", statusCode);
        }
      } catch (error) {
        console.error("Error parsing SSE message:", error);
      }
    };

    eventSource.addEventListener("message", handleMessage);
    eventSource.onerror = () => {
      toast.error("Connection lost.", {
        description: "The server connection was interrupted.",
      });
      eventSource.close();
      setPending(false);
    };

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    // Show immediate feedback
    toast("Message under processing...", {
      description: "We're processing your request.",
      icon: <Check className="size-4 text-gray-500" />,
    });

    // Reset form
    (e.target as HTMLFormElement).reset();

    // Re-enable button after 1 second (fake timeout for UX)
    setTimeout(() => {
      setPending(false);
    }, 1000);

    
  };

  return (
    <section id="contact" className="scroll-mt-16 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Get In Touch
          </h2>
          <Separator className="mt-4 mb-10" />
        </motion.div>

        <div className="grid gap-10 md:grid-cols-[1fr_280px]">
          {/* Contact form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I&apos;ll get back to you as soon
                  as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can I help you?"
                      rows={5}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="self-start"
                    disabled={pending}
                  >
                    {pending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="size-4" data-icon="inline-start" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar: email + social links */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
          >
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Email
              </h3>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-sm transition-colors hover:text-primary"
              >
                <Mail className="size-4" />
                {siteConfig.email}
              </a>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Social
              </h3>
              <div className="flex flex-col gap-2">
                {siteConfig.socialLinks.map((link) => {
                  const Icon = iconMap[link.icon];
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="size-4" />
                      {link.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
