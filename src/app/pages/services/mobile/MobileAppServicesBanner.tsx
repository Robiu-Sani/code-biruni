import React from "react";
import {
  Smartphone,
  Zap,
  ArrowRight,
  CheckCircle,
  TabletSmartphone,
  AppWindow,
  Database,
  Shield,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function MobileAppServicesBanner() {
  const services = [
    {
      title: "iOS Development",
      description: "Native apps for iPhone and iPad",
      icon: <AppWindow className="h-5 w-5 text-blue-500" />,
      tech: ["Swift", "SwiftUI", "UIKit", "Combine"],
    },
    {
      title: "Android Development",
      description: "Native apps for Android devices",
      icon: <Smartphone className="h-5 w-5 text-green-500" />,
      tech: ["Kotlin", "Jetpack Compose", "Android SDK", "Coroutines"],
    },
    {
      title: "Cross-Platform",
      description: "Single codebase for all platforms",
      icon: <TabletSmartphone className="h-5 w-5 text-purple-500" />,
      tech: ["Flutter", "React Native", "Ionic", "Xamarin"],
    },
    {
      title: "Backend for Mobile",
      description: "APIs and services for your app",
      icon: <Server className="h-5 w-5 text-amber-500" />,
      tech: ["Node.js", "Firebase", "GraphQL", "WebSockets"],
    },
  ];

  const benefits = [
    {
      title: "Performance Optimized",
      description: "60fps smooth animations and transitions",
      icon: <Zap className="h-5 w-5 text-amber-500" />,
    },
    {
      title: "Offline First",
      description: "Works seamlessly without internet",
      icon: <Database className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Secure by Design",
      description: "Data encryption and secure authentication",
      icon: <Shield className="h-5 w-5 text-green-500" />,
    },
    {
      title: "App Store Ready",
      description: "Guideline-compliant deployments",
      icon: <CheckCircle className="h-5 w-5 text-purple-500" />,
    },
  ];

  const platforms = {
    ios: ["iPhone", "iPad", "Apple Watch", "Apple TV"],
    android: ["Phones", "Tablets", "Wear OS", "Android TV"],
    cross: ["iOS", "Android", "Web", "Desktop"],
  };

  return (
    <section className="w-full py-12 md:py-16 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Smartphone className="h-3 w-3 mr-2" />
            Mobile Specialists
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Mobile App Development Services
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-zinc-600 dark:text-zinc-300">
            We craft high-performance mobile experiences for iOS, Android, and
            cross-platform with beautiful interfaces and seamless functionality.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
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
                  {service.tech.map((tech, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tech}
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
              <h2 className="text-2xl font-semibold mb-6">
                Why Our Mobile Apps Stand Out
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
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

            {/* Development Process */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm mt-6">
              <h2 className="text-2xl font-semibold mb-6">
                Our Mobile Development Process
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
                      Discovery & Strategy
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-300">
                      User research, technical feasibility, and roadmap planning
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
                    <h3 className="font-medium text-lg mb-1">UI/UX Design</h3>
                    <p className="text-zinc-600 dark:text-zinc-300">
                      Wireframing, prototyping, and design system creation
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
                    <h3 className="font-medium text-lg mb-1">Development</h3>
                    <p className="text-zinc-600 dark:text-zinc-300">
                      Agile sprints with weekly builds and testing
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
                      Deployment & Growth
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-300">
                      App store submission, analytics, and iteration
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Platforms & Case Study */}
          <div className="md:w-1/3">
            {/* Platforms Supported */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                Platforms We Support
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-2">
                    <AppWindow className="h-4 w-4 mr-2 text-blue-500" />
                    <h3 className="font-medium">Apple Ecosystem</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {platforms.ios.map((platform, i) => (
                      <Badge key={i} variant="outline">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Smartphone className="h-4 w-4 mr-2 text-green-500" />
                    <h3 className="font-medium">Android Ecosystem</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {platforms.android.map((platform, i) => (
                      <Badge key={i} variant="outline">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <TabletSmartphone className="h-4 w-4 mr-2 text-purple-500" />
                    <h3 className="font-medium">Cross-Platform</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {platforms.cross.map((platform, i) => (
                      <Badge key={i} variant="outline">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm mt-6">
              <h2 className="flex items-center text-lg font-semibold mb-4">
                <Zap className="h-4 w-4 mr-2 text-amber-500" />
                Featured Mobile App
              </h2>
              <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-lg mb-4 flex items-center justify-center">
                <Smartphone className="h-12 w-12 text-zinc-400" />
              </div>
              <h3 className="font-medium text-lg mb-2">Fitness Tracker Pro</h3>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                Cross-platform health app with React Native, syncing with 50+
                wearables and health devices.
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">4.9 App Store rating</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">1M+ downloads</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">85% retention rate</span>
                </div>
              </div>
              <Link  href='/pages/company/contact'>
              <Button variant="outline" className="w-full">
                View Case Study
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              </Link>
            </div>

            {/* CTA */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm mt-6">
              <h2 className="text-lg font-semibold mb-4">
                Ready to Build Your App?
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                Let`s discuss how we can bring your mobile vision to life with
                our expertise.
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
