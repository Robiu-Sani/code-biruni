import React from "react";
import {
  Code,
  Database,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle,
  Zap,
  Server,
  Globe,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function MernServicesBanner() {
  const mernServices = [
    {
      title: "MongoDB Development",
      description: "Schema design, query optimization, and database management",
      icon: <Database className="h-5 w-5 text-green-500" />,
      features: ["CRUD Operations", "Aggregation", "Indexing", "Atlas Cloud"],
    },
    {
      title: "Express.js APIs",
      description: "RESTful and GraphQL API development with Node.js",
      icon: <Server className="h-5 w-5 text-gray-500" />,
      features: ["Middleware", "JWT Auth", "Rate Limiting", "Error Handling"],
    },
    {
      title: "React Frontends",
      description: "Interactive UIs with modern React ecosystems",
      icon: <Code className="h-5 w-5 text-blue-500" />,
      features: ["Hooks", "Context API", "Redux", "Next.js"],
    },
    {
      title: "Node.js Backends",
      description: "Scalable server-side JavaScript applications",
      icon: <Cpu className="h-5 w-5 text-emerald-500" />,
      features: ["Microservices", "WebSockets", "CLI Tools", "Serverless"],
    },
  ];

  const mernBenefits = [
    {
      title: "Full JavaScript",
      description: "Single language across entire stack",
      icon: <CheckCircle className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Rapid Development",
      description: "Quick prototyping and iteration",
      icon: <Zap className="h-5 w-5 text-amber-500" />,
    },
    {
      title: "Scalable Architecture",
      description: "Grows with your user base",
      icon: <Layers className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Active Community",
      description: "Abundant resources and support",
      icon: <Globe className="h-5 w-5 text-green-500" />,
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Rocket className="h-3 w-3 mr-2" />
            MERN Stack Specialists
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Expert MERN Stack Development
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-zinc-600 dark:text-zinc-300">
            We build high-performance web applications using MongoDB,
            Express.js, React, and Node.js - the complete JavaScript stack.
          </p>
        </div>

        {/* MERN Services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mernServices.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex flex-col h-full">
                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg w-fit mb-4">
                  {service.icon}
                </div>
                <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4 flex-grow">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Benefits & Process */}
          <div className="md:w-2/3">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Why Choose MERN?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {mernBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-300">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MERN Workflow */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm mt-6">
              <h2 className="text-2xl font-semibold mb-6">
                Our MERN Development Process
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      1
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">
                      Requirements & Architecture
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-300">
                      Define data models, API structure, and UI components
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      2
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">
                      Backend Development
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-300">
                      Build Express.js APIs and MongoDB schemas
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg">
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      3
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">
                      Frontend Development
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-300">
                      Create React interfaces with state management
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                    <span className="font-bold text-green-600 dark:text-green-400">
                      4
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">
                      Testing & Deployment
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-300">
                      Full-stack integration and CI/CD pipeline setup
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Case Study & CTA */}
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <h2 className="flex items-center text-lg font-semibold mb-4">
                <Zap className="h-4 w-4 mr-2 text-amber-500" />
                MERN Success Story
              </h2>
              <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-4 flex items-center justify-center">
                <Code className="h-12 w-12 text-zinc-400" />
              </div>
              <h3 className="font-medium text-lg mb-2">
                SaaS Dashboard Platform
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                Built a real-time analytics dashboard with React, Node.js
                WebSockets, and MongoDB change streams, processing 5,000+ data
                points per second.
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">60% faster data rendering</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Real-time updates</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Scaled to 50,000+ users</span>
                </div>
              </div>
              <Link  href='/pages/company/contact'>
              <Button variant="outline" className="w-full">
                Read Case Study
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              </Link>
            </div>

            {/* MERN Tech Stack */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm mt-6">
              <h2 className="text-lg font-semibold mb-4">MERN Tech Stack</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Core</h3>
                  <div className="flex flex-wrap gap-2">
                    {["MongoDB", "Express.js", "React", "Node.js"].map(
                      (tech, i) => (
                        <Badge key={i} variant="default">
                          {tech}
                        </Badge>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Common Add-ons</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Redux",
                      "GraphQL",
                      "TypeScript",
                      "Mongoose",
                      "JWT",
                      "WebSockets",
                    ].map((tech, i) => (
                      <Badge key={i} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm mt-6">
              <h2 className="text-lg font-semibold mb-4">
                Start Your MERN Project
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                Let`s build something amazing with the power of full-stack
                JavaScript.
              </p>
              <Link  href='/pages/company/contact'>
              <Button className="w-full">
                Get Free Consultation
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
