'use client'
import React from "react";
import {
  Users,
  Award,
  Code,
  ArrowRight,
  CheckCircle,
  HeartHandshake,
  Globe,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

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

  const teamMembers = [
    {
      name: "Rifat Rahman",
      role: "CEO",
      icon: <Users className="h-5 w-5 text-blue-500" />,
      image: "https://i.postimg.cc/CLvCPJVm/649096364-4281095825473912-1713237592401792416-n.jpg",
    },
    {
      name: "Robius Sani",
      role: "CTO",
      icon: <Code className="h-5 w-5 text-purple-500" />,
      image: "https://avatars.githubusercontent.com/u/148758251?v=4",
    },
    {
      name: "Shimul Hossain",
      role: "COO",
      icon: <Award className="h-5 w-5 text-amber-500" />,
      image: "https://i.postimg.cc/nLqDJG6z/646348559-2152999638849812-4891187165175593480-n.jpg",
    },
    {
      name: "Dibbayan Datta",
      role: "CMO",
      icon: <Globe className="h-5 w-5 text-green-500" />,
      image: "https://i.postimg.cc/HW67dxPr/647548613-1298177328831729-4955942451501221677-n.jpg",
    },
  ];

  return (
    <section className="w-full py-12 md:py-16">
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
                    <p className="text-zinc-600 dark:text-zinc-300 text-sm">
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
                  Founded in 2025 by Rifat Rahman and Robius Sani, Code Biruni started as an open-source project to solve common pain points in modern web development. What began as a side project quickly gained traction as developers discovered the power of our tools.
                </p>
                <p>
                  Joined by Shimul Hossain as COO and Dibbayan Datta as CMO, our founding team brought together expertise in technology, operations, and marketing to scale our vision. Together, they transformed a simple idea into a growing company serving developers worldwide.
                </p>
                <p>
                  Today, we`re proud to serve millions of developers worldwide while staying true to our open-source roots and commitment to the developer community. Our diverse team, representing multiple nationalities, works tirelessly to build tools that make development faster, easier, and more enjoyable.
                </p>
              </div>
            </div>
          </div>

          {/* Team Spotlight */}
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <h2 className="flex items-center text-lg font-semibold mb-4">
                <Users className="h-4 w-4 mr-2 text-zinc-600 dark:text-zinc-300" />
                Meet Our Founding Team
              </h2>
              <div className="space-y-4 mb-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3 group hover:bg-zinc-50 dark:hover:bg-zinc-800 p-2 rounded-lg transition-colors">
                    <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex-shrink-0">
                      <Image
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                        width={48}
                        height={48}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "https://via.placeholder.com/48";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{member.name}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center">
                        <span className="mr-1">{member.icon}</span>
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/pages/company/team">
                <Button variant="link" className="mt-2 px-0 text-zinc-600 dark:text-zinc-300">
                  View full team
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Join Us */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm mt-6">
              <h2 className="flex items-center text-lg font-semibold mb-4">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Want to Join Us?
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                We`re always looking for talented people to join our team. If you`re passionate about developer tools, we`d love to hear from you.
              </p>
              
              {/* Company Contact */}
              <div className="mb-4 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                <p className="text-sm font-medium mb-2">Company Contact:</p>
                <div className="space-y-2">
                  <a
                    href="tel:+8801602957691"
                    className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300 hover:text-primary transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span>+8801602957691</span>
                  </a>
                  <a
                    href="mailto:contact@codebiruni.com"
                    className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300 hover:text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>contact@codebiruni.com</span>
                  </a>
                </div>
              </div>

              <Link href="/pages/company/contact">
                <Button className="w-full">
                  Contact Us
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