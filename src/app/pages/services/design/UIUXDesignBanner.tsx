import React from "react";
import {
  Palette,
  Layout,
  Smartphone,
  Figma,
  Code,
  ArrowRight,
  CheckCircle,
  Zap,
  PenTool,
  Eye,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function UIUXDesignBanner() {
  const designPrinciples = [
    {
      title: "User-Centered",
      description: "We start with user research to understand real needs",
      icon: <Eye className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Consistent",
      description: "Design systems ensure cohesive experiences",
      icon: <Layout className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Accessible",
      description: "WCAG compliant designs for all users",
      icon: <Circle className="h-5 w-5 text-green-500" />,
    },
  ];

  const services = [
    {
      title: "UI Design",
      description: "Beautiful, functional interfaces",
      icon: <Palette className="h-5 w-5" />,
    },
    {
      title: "UX Research",
      description: "Data-driven user insights",
      icon: <Smartphone className="h-5 w-5" />,
    },
    {
      title: "Prototyping",
      description: "Interactive design mockups",
      icon: <Figma className="h-5 w-5" />,
    },
    {
      title: "Design Systems",
      description: "Scalable component libraries",
      icon: <Code className="h-5 w-5" />,
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Main Content */}
          <div className="md:w-2/3">
            <Badge variant="outline" className="mb-4">
              <PenTool className="h-3 w-3 mr-2" />
              Design Excellence
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Crafting Exceptional Digital Experiences
            </h1>

            <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8 max-w-2xl">
              Our design philosophy combines aesthetic elegance with functional
              precision to create interfaces that users love and remember.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Button variant="default">View Portfolio</Button>
              <Button variant="outline">UI Design</Button>
              <Button variant="outline">UX Research</Button>
              <Button variant="outline">Design Systems</Button>
            </div>

            {/* Design Principles */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm mb-8">
              <h2 className="flex items-center text-lg font-semibold mb-4">
                <Zap className="h-4 w-4 mr-2 text-zinc-600 dark:text-zinc-300" />
                Our Design Principles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {designPrinciples.map((principle, index) => (
                  <div key={index} className="group">
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg w-fit mb-3">
                      {principle.icon}
                    </div>
                    <h3 className="font-medium text-lg mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-300">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <h2 className="flex items-center text-lg font-semibold mb-4">
                <Layout className="h-4 w-4 mr-2 text-zinc-600 dark:text-zinc-300" />
                Our Services
              </h2>

              <div className="space-y-6">
                {services.map((service, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg">
                        {service.icon}
                      </div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 pl-11">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                variant="link"
                className="mt-4 px-0 text-zinc-600 dark:text-zinc-300"
              >
                Explore all services
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Process */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm mt-6">
              <h2 className="flex items-center text-lg font-semibold mb-4">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Our Process
              </h2>
              <ol className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                <li className="flex items-start">
                  <span className="inline-block bg-zinc-100 dark:bg-zinc-800 rounded-full w-5 h-5 text-center mr-2 text-xs font-medium leading-5">
                    1
                  </span>
                  Research & Discovery
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-zinc-100 dark:bg-zinc-800 rounded-full w-5 h-5 text-center mr-2 text-xs font-medium leading-5">
                    2
                  </span>
                  Wireframing & Prototyping
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-zinc-100 dark:bg-zinc-800 rounded-full w-5 h-5 text-center mr-2 text-xs font-medium leading-5">
                    3
                  </span>
                  UI Design & Testing
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-zinc-100 dark:bg-zinc-800 rounded-full w-5 h-5 text-center mr-2 text-xs font-medium leading-5">
                    4
                  </span>
                  Implementation & Handoff
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Design Showcase */}
        <div className="mt-12 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <Figma className="h-6 w-6 text-zinc-500" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-semibold">Featured Case Study</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                See how we redesigned the mobile banking app for FinTech Corp,
                resulting in a 40% increase in user engagement and 25% faster
                transaction completion.
              </p>
            </div>
            <Link  href='/pages/company/contact'>
            <Button variant="outline" className="shrink-0">
              View Case Study
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
