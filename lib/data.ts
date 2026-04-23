export const siteConfig = {
  name: "Dev Ashish",
  title: "Software @WiseTech Global | Backend & Distributed Systems",
  tagline:
    "Backend engineer focused on scalable systems, distributed architecture, and real-world problem solving.",
  bio: [
    "I'm a Software Engineer who builds scalable backend systems and solves real-world problems. I've worked on payment systems, distributed architectures, and performance optimization using .NET Core, Azure Service Bus, and Redis. I focus on writing reliable, testable code and designing systems that handle scale gracefully.",
    "When I'm not coding, you'll probably find me on a volleyball court or a cricket field. I've competed at state and district levels, and I enjoy the competitive spirit and teamwork that comes with it. I also spend time solving coding problems and participating in contests - it's my version of a workout for the brain.",
  ],
  email: "6113devashish@gmail.com",
  resumePath: "/resume.pdf",
  profileImage: "/profile.jpg",
  socialLinks: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/dev-ashish-046695206",
      icon: "linkedin" as const,
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
