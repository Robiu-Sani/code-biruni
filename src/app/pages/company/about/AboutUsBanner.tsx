import React from "react";
import {
  Users,
  
  Award,
  Code,
  
  ArrowRight,
  CheckCircle,
  
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function AboutUsBanner() {


  const values = [
    {
      title: "Open Source First",
      description:
        "We believe in building in the open and giving back to the community",
      icon: <Code className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Customer Obsessed",
      description: "Our users are at the center of everything we build",
      icon: <HeartHandshake className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Excellence in Craft",
      description:
        "We take pride in building high-quality, thoughtful products",
      icon: <Award className="h-5 w-5 text-amber-500" />,
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Users className="h-3 w-3 mr-2" />
            Our Story
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Building the Future of Developer Tools
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-zinc-600 dark:text-zinc-300">
            Code Biruni was founded with a simple mission: to create tools that
            make developers` lives easier and more productive.
          </p>
        </div>

     

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Our Values */}
          <div className="md:w-2/3">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm mb-8">
              <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="group">
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg w-fit mb-3">
                      {value.icon}
                    </div>
                    <h3 className="font-medium text-lg mb-2">{value.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-300">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Story */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-300">
                <p>
                  Founded in 2025 by a team of frustrated developers, Code
                  Biruny started as an open-source project to solve common pain
                  points in modern web development.
                </p>
                <p>
                  What began as a side project quickly grew into a full-fledged
                  company as more developers discovered and contributed to our
                  tools.
                </p>
                <p>
                  Today, we`re proud to serve millions of developers worldwide
                  while staying true to our open-source roots and commitment to
                  the developer community.
                </p>
              </div>
            </div>
          </div>

          {/* Team Spotlight */}
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <h2 className="flex items-center text-lg font-semibold mb-4">
                <Users className="h-4 w-4 mr-2 text-zinc-600 dark:text-zinc-300" />
                Meet Our Panel
              </h2>
              <div className="space-y-6 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <Users className="h-5 w-5 text-zinc-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Rifat Rahman</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      CEO & Co-founder
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <Code className="h-5 w-5 text-zinc-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Robius Sani</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      CTO & Co-founder
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <Award className="h-5 w-5 text-zinc-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Jakariya</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Head of Web-services
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <Award className="h-5 w-5 text-zinc-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Emma Rodriguez</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Head of Design
                    </p>
                  </div>
                </div>
              </div>
              {/* <Button
                variant="link"
                className="mt-4 px-0 text-zinc-600 dark:text-zinc-300"
              >
                View full team
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button> */}
            </div>

            {/* Join Us */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm mt-6">
              <h2 className="flex items-center text-lg font-semibold mb-4">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Want to Join Us?
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                We`re always looking for talented people to join our team.
              </p>
              <Link  href='/pages/company/contact'>
              <Button className="w-full">
                View Open Positions
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
