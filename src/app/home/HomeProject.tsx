"use client";
import React, { useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HomeProject() {
  const projects = [
    {
      id: 1,
      name: "Food Delivery App",
      image: "/project/food.jpeg",
      description: "Modern food delivery platform with real-time tracking",
      tags: ["Mobile", "React Native", "Firebase"],
    },
    {
      id: 2,
      name: "Industrial App",
      image: "/project/light.jpeg",
      description: "IoT solution for industrial equipment monitoring",
      tags: ["IoT", "React", "Node.js"],
    },
    {
      id: 3,
      name: "Building management",
      image: "/project/lux-tower.jpeg",
      description: "Smart building management system with energy optimization",
      tags: ["Web", "Dashboard", "Analytics"],
    },
    {
      id: 4,
      name: "Pay Path",
      image: "/project/pay-path.jpeg",
      description: "Secure payment gateway for e-commerce businesses",
      tags: ["Fintech", "Security", "API"],
    },
    {
      id: 5,
      name: "Product Flow",
      image: "/project/productflow.jpeg",
      description: "Inventory and supply chain management solution",
      tags: ["ERP", "Logistics", "Cloud"],
    },
    {
      id: 6,
      name: "Hefzur Rahman",
      image: "/project/hefzur-rahman.jpeg",
      description: "Educational platform for Islamic studies",
      tags: ["E-learning", "CMS", "Mobile"],
    },
    {
      id: 7,
      name: "Nore Risalat Model Madrasha",
      image: "/project/nrmm.jpeg",
      description: "School management system with attendance tracking",
      tags: ["Education", "Management", "Web"],
    },
    {
      id: 8,
      name: "Tamirul Ummah Madrasha",
      image: "/project/tum.jpeg",
      description: "Comprehensive madrasa administration platform",
      tags: ["Education", "Database", "Reporting"],
    },
  ];

  const sliderRef = useRef<HTMLDivElement>(null);
  const duplicatedProjects = [...projects, ...projects];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 30000; // 30 seconds for full loop
    const distance = slider.scrollWidth / 2;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      slider.style.transform = `translateX(-${progress * distance}px)`;

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Reset animation when complete
        startTime = null;
        slider.style.transform = "translateX(0)";
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of innovative solutions that have helped
            businesses transform their digital presence.
          </p>
        </div>

        {/* Infinite scrolling container */}
        <div className="relative overflow-hidden group">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-background/0 to-background w-full h-full pointer-events-none" />

          <div
            ref={sliderRef}
            className="flex gap-6 py-4 will-change-transform"
            style={{ width: "max-content" }}
          >
            {duplicatedProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="flex-shrink-0 w-[300px] transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <Card className="h-full py-0 flex flex-col">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <h3 className="font-semibold text-lg mb-2">
                      {project.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-muted rounded-full transition-colors hover:bg-primary hover:text-primary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    {/* <Button
                      variant="outline"
                      size="sm"
                      className="w-full transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                      View Details{" "}
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button> */}
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 animate-fade-in-up">
          <Link href='/pages/company/contact'>
          <Button
            size="lg"
            className="transition-all hover:scale-105 hover:shadow-md"
          >
            Contact With Us 
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button></Link>
        </div>
      </div>
    </section>
  );
}
