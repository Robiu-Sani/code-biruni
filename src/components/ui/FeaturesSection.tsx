import { cn } from "@/lib/utils";
import {
  IconCode,
  IconEaseInOut,
  IconCurrencyDollar,
  IconCloud,
  IconLayersIntersect,
  IconHelp,
  IconSettingsAutomation,
  IconHeartHandshake,
} from "@tabler/icons-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Smart Web Solutions",
      description:
        "At CodeBiruni, we craft dynamic, responsive, and high-performance websites that elevate your brand online.",
      icon: <IconCode />,
    },
    {
      title: "User-Friendly Design",
      description:
        "Every line of code and pixel is designed to provide an effortless and engaging user experience.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Transparent Pricing",
      description:
        "We believe in fair, flexible pricing — no hidden fees, no surprises. Just honest value for your investment.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Reliable Cloud Infrastructure",
      description:
        "Our software runs on secure and scalable cloud systems to ensure stability and 99.9% uptime.",
      icon: <IconCloud />,
    },
    {
      title: "Integrated Software Ecosystem",
      description:
        "We build interconnected systems — from websites to ERP and automation — all under one architecture.",
      icon: <IconLayersIntersect />,
    },
    {
      title: "Dedicated Support Team",
      description:
        "Our experts are here for you 24/7 — ready to assist, guide, and ensure your project runs smoothly.",
      icon: <IconHelp />,
    },
    {
      title: "Automation & Innovation",
      description:
        "From AI integrations to workflow automation, CodeBiruni empowers businesses with future-ready technology.",
      icon: <IconSettingsAutomation />,
    },
    {
      title: "Partnership That Lasts",
      description:
        "We don’t just deliver projects — we build long-term partnerships rooted in trust and mutual growth.",
      icon: <IconHeartHandshake />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
