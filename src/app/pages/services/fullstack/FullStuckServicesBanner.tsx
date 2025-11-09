import React from "react";
import {
  Code,
  Server,
  Database,
  Smartphone,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle,
  Zap,
  GitBranch,
  Cloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function FullStackServicesBanner() {
  const services = [
    {
      title: "Frontend Development",
      description: "Modern React, Next.js, and Vue applications",
      icon: <Code className="h-5 w-5 text-blue-500" />,
      tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Backend Development",
      description: "Scalable API and microservices architecture",
      icon: <Server className="h-5 w-5 text-purple-500" />,
      tech: ["Node.js", "Python", "Go", "Ruby on Rails"],
    },
    {
      title: "Database Solutions",
      description: "Optimized data storage and retrieval",
      icon: <Database className="h-5 w-5 text-green-500" />,
      tech: ["PostgreSQL", "MongoDB", "Redis", "Firebase"],
    },
    {
      title: "Mobile Development",
      description: "Cross-platform mobile experiences",
      icon: <Smartphone className="h-5 w-5 text-amber-500" />,
      tech: ["React Native", "Flutter", "Swift", "Kotlin"],
    },
    {
      title: "DevOps & Cloud",
      description: "CI/CD pipelines and infrastructure",
      icon: <Cloud className="h-5 w-5 text-red-500" />,
      tech: ["AWS", "Docker", "Kubernetes", "Terraform"],
    },
    {
      title: "API Integration",
      description: "Third-party service connections",
      icon: <GitBranch className="h-5 w-5 text-indigo-500" />,
      tech: ["REST", "GraphQL", "WebSockets", "gRPC"],
    },
  ];

  const processSteps = [
    {
      title: "Consultation",
      description: "Understand your business requirements",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      title: "Planning",
      description: "Technical specifications and architecture",
      icon: <Layers className="h-5 w-5" />,
    },
    {
      title: "Development",
      description: "Agile sprints with continuous delivery",
      icon: <Code className="h-5 w-5" />,
    },
    {
      title: "Deployment",
      description: "Production rollout and monitoring",
      icon: <Zap className="h-5 w-5" />,
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Cpu className="h-3 w-3 mr-2" />
            End-to-End Solutions
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Full Stack Development Services
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-zinc-600 dark:text-zinc-300">
            We build complete digital solutions from frontend to backend, with
            seamless integration and exceptional performance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg">
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2">{service.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-300 mb-3">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tech.map((tech, i) => (
                      <Badge key={i} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Our Process */}
          <div className="md:w-2/3">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">
                Our Development Process
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg mt-1">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">{step.title}</h3>
                      <p className="text-zinc-600 dark:text-zinc-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm mt-6">
              <h2 className="text-2xl font-semibold mb-4">
                Technologies We Use
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "Next.js",
                      "Vue",
                      "Svelte",
                      "TypeScript",
                      "Tailwind CSS",
                    ].map((tech, i) => (
                      <Badge key={i} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Python", "Go", "Ruby", "Java", ".NET"].map(
                      (tech, i) => (
                        <Badge key={i} variant="outline">
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Mobile</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React Native", "Flutter", "Swift", "Kotlin"].map(
                      (tech, i) => (
                        <Badge key={i} variant="outline">
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Case Study */}
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <h2 className="flex items-center text-lg font-semibold mb-4">
                <Zap className="h-4 w-4 mr-2 text-amber-500" />
                Featured Project
              </h2>
              <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-4 flex items-center justify-center">
                <Code className="h-12 w-12 text-zinc-400" />
              </div>
              <h3 className="font-medium text-lg mb-2">E-commerce Platform</h3>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                Built a performant e-commerce solution with React frontend,
                Node.js microservices, and MongoDB database, handling 10,000+
                daily transactions.
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">40% faster load times</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">99.9% uptime</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">30% conversion increase</span>
                </div>
              </div>
              <Link  href='/pages/company/contact'>
              <Button variant="outline" className="w-full">
                View Case Study
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button> </Link>
            </div>

            {/* CTA */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm mt-6">
              <h2 className="text-lg font-semibold mb-4">
                Ready to build your project?
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                Let`s discuss how we can help bring your vision to life with our
                full stack expertise.
              </p>
              <Link  href='/pages/company/contact'>
              <Button className="w-full">
                Get a Free Consultation
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
