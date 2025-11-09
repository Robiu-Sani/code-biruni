import React from "react";
import {
  Briefcase,
  Rocket,
  Users,
  ArrowRight,
  CheckCircle,
  MapPin,
  DollarSign,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function CareerBanner() {
  const jobOpenings = [
    {
      title: "Frontend Developer",
      type: "Full-time",
      location: "Remote",
      salary: "$90,000 - $120,000",
      posted: "2 days ago",
    },
    {
      title: "UX Designer",
      type: "Contract",
      location: "San Francisco",
      salary: "$70 - $90/hr",
      posted: "1 week ago",
    },
    {
      title: "Backend Engineer",
      type: "Full-time",
      location: "New York",
      salary: "$110,000 - $140,000",
      posted: "3 days ago",
    },
  ];

  const perks = [
    "Competitive salaries and equity",
    "Flexible work arrangements",
    "Health, dental, and vision insurance",
    "Professional development budget",
    "Generous vacation policy",
    "Latest tech equipment",
  ];

  return (
    <section className="w-full py-12 md:py-16 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Main Content */}
          <div className="md:w-2/3">
            <Badge variant="outline" className="mb-4">
              <Briefcase className="h-3 w-3 mr-2" />
              We`re Hiring
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Build Your Career at Code Biruni
            </h1>

            <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8 max-w-2xl">
              Join our team of passionate engineers and designers building the
              future of web development tools. We value creativity,
              collaboration, and continuous learning.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Button variant="default">View All Positions</Button>
              <Button variant="outline">Engineering</Button>
              <Button variant="outline">Design</Button>
              <Button variant="outline">Product</Button>
              <Button variant="outline">Marketing</Button>
            </div>

            {/* Perks */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm mb-8">
              <h2 className="flex items-center text-lg font-semibold mb-4">
                <Rocket className="h-4 w-4 mr-2 text-zinc-600 dark:text-zinc-300" />
                Our Perks & Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {perks.map((perk, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Job Openings */}
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <h2 className="flex items-center text-lg font-semibold mb-4">
                <Briefcase className="h-4 w-4 mr-2 text-zinc-600 dark:text-zinc-300" />
                Current Openings
              </h2>

              <div className="space-y-6">
                {jobOpenings.map((job, index) => (
                  <div key={index} className="group">
                    <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                      <Badge variant="secondary">{job.type}</Badge>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Posted {job.posted}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="link"
                className="mt-4 px-0 text-zinc-600 dark:text-zinc-300"
              >
                View all job openings
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Team Culture */}
        <div className="mt-12 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <Users className="h-6 w-6 text-zinc-500" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-semibold">Our Team Culture</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                We believe in work-life harmony, continuous learning, and
                creating an inclusive environment where everyone can do their
                best work. Our team is distributed across multiple time zones,
                with a strong focus on asynchronous communication.
              </p>
            </div>
            <Link  href='/pages/company/contact'>
            <Button variant="outline" className="shrink-0">
              Meet the team
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
