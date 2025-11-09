import React from "react";
import {
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  BookOpen,
  Mic,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function UpComingBanner() {
  const upcomingEvents = [
    {
      title: "Next.js 14 Launch Event",
      type: "Webinar",
      date: "Oct 15, 2025",
      time: "2:00 PM EST",
      speaker: "Vercel Team",
      badge: "Live",
    },
    {
      title: "React State Management Workshop",
      type: "Workshop",
      date: "Nov 2, 2025",
      time: "10:00 AM EST",
      speaker: "Sarah Johnson",
      badge: "Free",
    },
    {
      title: "TypeScript Masterclass",
      type: "Course",
      date: "Dec 5, 2025",
      time: "9:00 AM EST",
      speaker: "Michael Chen",
      badge: "Pro",
    },
  ];

  const featuredContent = [
    {
      title: "The Future of CSS",
      format: "Article",
      eta: "Coming next week",
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Podcast: AI in DevTools",
      format: "Podcast",
      eta: "Recording in progress",
      icon: <Mic className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "React Performance Deep Dive",
      format: "Video Tutorial",
      eta: "Editing phase",
      icon: <Video className="h-5 w-5 text-amber-500" />,
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Main Content */}
          <div className="md:w-2/3">
            <Badge variant="outline" className="mb-4">
              <Calendar className="h-3 w-3 mr-2" />
              Coming Soon
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Upcoming Events & Content
            </h1>

            <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8 max-w-2xl">
              Discover what we`re working on next - from live events to new
              tutorials and resources for developers.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Button variant="default">View All</Button>
              <Button variant="outline">Events</Button>
              <Button variant="outline">Articles</Button>
              <Button variant="outline">Videos</Button>
              <Button variant="outline">Podcasts</Button>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm mb-8">
              <h2 className="flex items-center text-lg font-semibold mb-4">
                <Calendar className="h-4 w-4 mr-2 text-zinc-600 dark:text-zinc-300" />
                Upcoming Events
              </h2>
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-1">
                          <h3 className="font-medium group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>
                          <Badge variant="secondary" className="ml-2">
                            {event.badge}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
                          <Clock className="h-3 w-3 mr-1" />
                          <span className="mr-3">{event.date}</span>
                          <span>{event.time}</span>
                        </div>
                      </div>
                      
                    </div>
                    <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      <span>With {event.speaker}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="link"
                className="mt-4 px-0 text-zinc-600 dark:text-zinc-300"
              >
                View all events
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Featured Content */}
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <h2 className="flex items-center text-lg font-semibold mb-4">
                <Zap className="h-4 w-4 mr-2 text-amber-500" />
                In Production
              </h2>

              <div className="space-y-6">
                {featuredContent.map((content, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start gap-3 mb-1">
                      <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg">
                        {content.icon}
                      </div>
                      <div>
                        <h3 className="font-medium group-hover:text-primary transition-colors">
                          {content.title}
                        </h3>
                        <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
                          <span>{content.format}</span>
                          <span className="mx-2">•</span>
                          <span>{content.eta}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="link"
                className="mt-4 px-0 text-zinc-600 dark:text-zinc-300"
              >
                See what`s coming
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Newsletter */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm mt-6">
              <h2 className="flex items-center text-lg font-semibold mb-4">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Get Notified
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                Be the first to know about new content and events.
              </p>
              <div className="flex flex-col gap-2">
                
              </div>
            </div>
          </div>
        </div>

        {/* Community */}
        <div className="mt-12 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <Users className="h-6 w-6 text-zinc-500" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-semibold">Join Our Community</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Connect with other developers and get early access to new
                content and events.
              </p>
            </div>
            <Link  href='/pages/company/contact'>
            <Button variant="outline" className="shrink-0">
              Join Now
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
