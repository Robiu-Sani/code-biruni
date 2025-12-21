"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Compass, Sparkles, Zap, Navigation } from "lucide-react";
import Image from "next/image";

const NotFound: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const canvasRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      originalSize: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.originalSize = Math.random() * 2 + 0.5;
        this.size = this.originalSize;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${200 + Math.random() * 160}, 70%, 60%)`;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update(mouseX: number, mouseY: number) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;
        
        if (distance < maxDistance) {
          const angle = Math.atan2(dy, dx);
          const force = (maxDistance - distance) / maxDistance;
          this.speedX -= Math.cos(angle) * force * 0.5;
          this.speedY -= Math.sin(angle) * force * 0.5;
        }

        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -0.9;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -0.9;
        
        // Friction
        this.speedX *= 0.98;
        this.speedY *= 0.98;
        
        // Pulsating effect
        this.size = this.originalSize + Math.sin(Date.now() * 0.001 + this.x) * 0.5;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const particles: Particle[] = [];
    const particleCount = 150;
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Mouse interaction
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = canvas.width / 2;
      mouseY = canvas.height / 2;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    let animationId: number;
    const animate = () => {
      if (!ctx) return;
      
      // Create gradient background with fade effect
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.1)'); // slate-900
      gradient.addColorStop(1, 'rgba(24, 24, 27, 0.1)'); // zinc-900
      
      // Clear with fade effect
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle grid effect
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.update(mouseX, mouseY);
        particle.draw();

        // Connect particles with lines
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      setCanvasDimensions();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-9999999999 min-h-screen w-full overflow-hidden bg-linear-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-950">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-300 dark:bg-cyan-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-500" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <div className="mb-8">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-50 animate-pulse" />
            <div className="relative bg-white dark:bg-zinc-800 rounded-2xl p-4 shadow-2xl">
              <Image
                src="/logo.png"
                alt="Code Biruni"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>
          
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter mb-4">
            <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              404
            </span>
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-linear-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent" />
            <Sparkles className="w-6 h-6 text-yellow-500 animate-spin" />
            <div className="h-px w-16 bg-linear-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Page Lost in Space
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-2">
            The page you&apos;re looking for has drifted into the digital void
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Don&apos;t worry, even the best explorers get lost sometimes
          </p>
        </div>

        {/* Interactive Elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-12">
          <div className="group relative bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 cursor-default">
            <div className="absolute -top-3 -right-3">
              <Zap className="w-6 h-6 text-yellow-500 animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Quick Navigation
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Use these paths to find your way back
            </p>
          </div>

          <div className="group relative bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 hover:-translate-y-1 cursor-default">
            <div className="absolute -top-3 -right-3">
              <Navigation className="w-6 h-6 text-purple-500 animate-bounce" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Explore More
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Discover new sections of our platform
            </p>
          </div>

          <div className="group relative bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-zinc-700 hover:border-green-300 dark:hover:border-green-500 transition-all duration-300 hover:-translate-y-1 cursor-default">
            <div className="absolute -top-3 -right-3">
              <Sparkles className="w-6 h-6 text-green-500 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Need Help?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Contact our support team anytime
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button
            onClick={() => router.back()}
            className="group px-8 py-6 bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-lg font-semibold">Go Back</span>
          </Button>

          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="group px-8 py-6 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border-2 border-gray-300 dark:border-zinc-600 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-800 dark:text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <Home className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-semibold">Return Home</span>
          </Button>

          <Button
            onClick={() => router.back()}
            className="group px-8 py-6 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <Compass className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
            <span className="text-lg font-semibold"> Go Back</span>
          </Button>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Still lost? Try searching or{" "}
            <button 
              onClick={() => router.push("/contact")}
              className="text-blue-500 dark:text-blue-400 hover:underline font-medium"
            >
              contact support
            </button>
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Code Biruni © {new Date().getFullYear()} • Error 404
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;