import React from "react";
import {
  BookOpen,
  PenSquare,
  CalendarDays,
  Clock,
  User,
  ArrowRight,
  Search,
  Heart,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function BlogPage() {
  const featuredPosts = [
    {
      id: 1,
      title: "Getting Started with Next.js 14",
      category: "Tutorial",
      readTime: "8 min read",
      date: "May 15, 2025",
      excerpt: "Learn the fundamentals of Next.js 14 and how to build modern web applications.",
    },
    {
      id: 2,
      title: "State Management in 2025",
      category: "Guide",
      readTime: "12 min read",
      date: "June 2, 2025",
      excerpt: "Explore the latest state management solutions and best practices.",
    },
    {
      id: 3,
      title: "CSS Container Queries",
      category: "Tips",
      readTime: "5 min read",
      date: "June 18, 2025",
      excerpt: "Master container queries for truly responsive component design.",
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Advanced React Patterns in 2025",
      category: "React",
      readTime: "10 min read",
      date: "June 20, 2025",
      excerpt: "Explore advanced React patterns like compound components, render props, and custom hooks for building scalable applications.",
      author: "Alex Johnson",
      likes: 124,
      comments: 23,
    },
    {
      id: 2,
      title: "Building a Full-Stack App with Next.js 14",
      category: "Next.js",
      readTime: "15 min read",
      date: "June 18, 2025",
      excerpt: "Learn how to build a complete full-stack application using Next.js 14, from API routes to authentication.",
      author: "Sarah Williams",
      likes: 98,
      comments: 17,
    },
    {
      id: 3,
      title: "TypeScript Best Practices for Large Projects",
      category: "TypeScript",
      readTime: "12 min read",
      date: "June 15, 2025",
      excerpt: "Discover TypeScript best practices for maintaining large codebases with strict type safety and better developer experience.",
      author: "Michael Chen",
      likes: 142,
      comments: 31,
    },
    {
      id: 4,
      title: "Modern CSS Techniques for Responsive Design",
      category: "CSS",
      readTime: "8 min read",
      date: "June 12, 2025",
      excerpt: "Master modern CSS techniques including Grid, Flexbox, and Container Queries for creating truly responsive layouts.",
      author: "Emma Rodriguez",
      likes: 87,
      comments: 12,
    },
    {
      id: 5,
      title: "State Management Solutions Compared",
      category: "React",
      readTime: "14 min read",
      date: "June 10, 2025",
      excerpt: "A comprehensive comparison of Redux, Zustand, Jotai, and React Query to help you choose the right state management solution.",
      author: "David Kim",
      likes: 156,
      comments: 42,
    },
    {
      id: 6,
      title: "Server Components in Next.js 14",
      category: "Next.js",
      readTime: "11 min read",
      date: "June 8, 2025",
      excerpt: "Deep dive into React Server Components and how they're implemented in Next.js 14 for improved performance.",
      author: "Lisa Thompson",
      likes: 203,
      comments: 28,
    },
    {
      id: 7,
      title: "TypeScript Generics Explained",
      category: "TypeScript",
      readTime: "9 min read",
      date: "June 5, 2025",
      excerpt: "Learn how to leverage TypeScript generics to create reusable and type-safe components and utilities.",
      author: "James Wilson",
      likes: 112,
      comments: 19,
    },
    {
      id: 8,
      title: "CSS-in-JS vs. CSS Modules",
      category: "CSS",
      readTime: "7 min read",
      date: "June 3, 2025",
      excerpt: "Compare different styling approaches in React applications and understand the trade-offs between CSS-in-JS and CSS Modules.",
      author: "Sophie Martin",
      likes: 95,
      comments: 14,
    },
    {
      id: 9,
      title: "React Performance Optimization",
      category: "React",
      readTime: "13 min read",
      date: "June 1, 2025",
      excerpt: "Learn advanced techniques to optimize React applications including memoization, code splitting, and virtualization.",
      author: "Robert Garcia",
      likes: 178,
      comments: 36,
    },
    {
      id: 10,
      title: "Next.js Image Optimization",
      category: "Next.js",
      readTime: "6 min read",
      date: "May 29, 2025",
      excerpt: "Master the Next.js Image component for automatic image optimization, lazy loading, and responsive delivery.",
      author: "Jennifer Lee",
      likes: 134,
      comments: 21,
    },
    {
      id: 11,
      title: "TypeScript Decorators",
      category: "TypeScript",
      readTime: "10 min read",
      date: "May 27, 2025",
      excerpt: "Explore TypeScript decorators and how they can be used for metaprogramming and enhancing class functionality.",
      author: "Daniel Brown",
      likes: 87,
      comments: 15,
    },
    {
      id: 12,
      title: "CSS Grid Layout Mastery",
      category: "CSS",
      readTime: "9 min read",
      date: "May 25, 2025",
      excerpt: "Master CSS Grid Layout to create complex, responsive designs with minimal code.",
      author: "Olivia Davis",
      likes: 121,
      comments: 18,
    },
    {
      id: 13,
      title: "React Hooks Deep Dive",
      category: "React",
      readTime: "12 min read",
      date: "May 22, 2025",
      excerpt: "Understand the inner workings of React Hooks and how to create custom hooks for reusable logic.",
      author: "William Taylor",
      likes: 167,
      comments: 29,
    },
    {
      id: 14,
      title: "Next.js Middleware Guide",
      category: "Next.js",
      readTime: "8 min read",
      date: "May 20, 2025",
      excerpt: "Learn how to use Next.js middleware for authentication, localization, and other edge-side functionality.",
      author: "Isabella Martinez",
      likes: 143,
      comments: 24,
    },
    {
      id: 15,
      title: "TypeScript Utility Types",
      category: "TypeScript",
      readTime: "7 min read",
      date: "May 18, 2025",
      excerpt: "Discover TypeScript's built-in utility types and how to create your own for powerful type transformations.",
      author: "Ethan Anderson",
      likes: 98,
      comments: 16,
    },
    {
      id: 16,
      title: "CSS Animations and Transitions",
      category: "CSS",
      readTime: "11 min read",
      date: "May 15, 2025",
      excerpt: "Create smooth animations and transitions with CSS to enhance user experience and engagement.",
      author: "Mia Thomas",
      likes: 132,
      comments: 22,
    },
    {
      id: 17,
      title: "React Context API Best Practices",
      category: "React",
      readTime: "9 min read",
      date: "May 12, 2025",
      excerpt: "Learn best practices for using React Context API effectively without performance issues.",
      author: "Noah Jackson",
      likes: 115,
      comments: 19,
    },
    {
      id: 18,
      title: "Next.js Static Site Generation",
      category: "Next.js",
      readTime: "10 min read",
      date: "May 10, 2025",
      excerpt: "Build lightning-fast static sites with Next.js SSG and learn when to use it over SSR.",
      author: "Ava White",
      likes: 156,
      comments: 27,
    },
    {
      id: 19,
      title: "TypeScript with React",
      category: "TypeScript",
      readTime: "8 min read",
      date: "May 8, 2025",
      excerpt: "Learn how to effectively use TypeScript with React for type-safe components and props.",
      author: "Logan Harris",
      likes: 142,
      comments: 23,
    },
    {
      id: 20,
      title: "CSS Custom Properties",
      category: "CSS",
      readTime: "6 min read",
      date: "May 5, 2025",
      excerpt: "Harness the power of CSS custom properties (variables) for theming and dynamic styling.",
      author: "Harper Clark",
      likes: 89,
      comments: 14,
    },
  ];

  return (
    <div className="min-h-screen  ">
      {/* Blog Banner Section */}
      <section className="w-full py-12 md:py-16 ">
        <div className="container mx-auto px-4 rounded-lg">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Main Content */}
            <div className="md:w-2/3">
              <Badge variant="outline" className="mb-4 ">
                <BookOpen className="h-3 w-3 mr-2" />
                Latest Articles
              </Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Code Biruni Blog
              </h1>

              <p className="text-lg  mb-8 max-w-2xl">
                Insights, tutorials and best practices for modern web development.
                Learn from our team of experts.
              </p>

              <div className="relative max-w-xl mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 " />
                <Input 
                  placeholder="Search articles..." 
                  className="pl-10   " 
                />
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <Button variant="default">All Posts</Button>
                <Button variant="outline">React</Button>
                <Button variant="outline">Next.js</Button>
                <Button variant="outline">TypeScript</Button>
                <Button variant="outline">CSS</Button>
              </div>
            </div>

            {/* Featured Posts */}
            <div className="md:w-1/3">
              <div className=" p-6 rounded-lg border  shadow-sm">
                <h2 className="flex items-center text-lg font-semibold mb-4 ">
                  <PenSquare className="h-4 w-4 mr-2 " />
                  Featured Posts
                </h2>

                <div className="space-y-6">
                  {featuredPosts.map((post) => (
                    <div key={post.id} className="group">
                      <Badge variant="secondary" className="mb-1  ">
                        {post.category}
                      </Badge>
                      <h3 className="font-medium mb-1 group-hover:text-primary transition-colors ">
                        {post.title}
                      </h3>
                      <p className="text-sm  mb-2">{post.excerpt}</p>
                      <div className="flex items-center text-sm ">
                        <CalendarDays className="h-3 w-3 mr-1" />
                        <span className="mr-3">{post.date}</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="link"
                  className="mt-4 px-0  hover:"
                >
                  View all featured posts
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Author Spotlight */}
          <div className="mt-12  p-6 rounded-lg border zinc-700 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full  flex items-center justify-center">
                <User className="h-6 w-6 " />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-semibold ">Written by Code Biruni Team</h3>
                <p className="text-sm  mt-1">
                  Our team of developers shares their knowledge and experience to
                  help you build better web applications.
                </p>
              </div>
              <Button variant="outline" className="shrink-0 zinc-700  ">
                Meet the team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Latest Blog Posts</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Newest</Button>
              <Button variant="outline" size="sm">Popular</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden py-0 hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="h-48  flex items-center justify-center">
                    <BookOpen className="h-12 w-12 " />
                  </div>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <div className="flex items-center text-xs ">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                  <p className="  mb-4 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm   mb-4">
                    <User className="h-3 w-3 mr-1" />
                    <span className="mr-3">{post.author}</span>
                    <CalendarDays className="h-3 w-3 mr-1" />
                    <span>{post.date}</span>
                  </div>
                </CardContent>
                <CardFooter className="px-5 pb-5 pt-0 flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="flex items-center text-sm  ">
                      <Heart className="h-3 w-3 mr-1" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center text-sm  ">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  {/* <Button variant="ghost" size="sm" className="text-xs">
                    Read more <ArrowRight className="h-3 w-3 ml-1" />
                  </Button> */}
                </CardFooter>
              </Card>
            ))}
          </div>

          
        </div>
      </section>

      {/* Newsletter Section */}
     
    </div>
  );
}