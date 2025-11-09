import { Rocket, Sparkles, Globe, Code, Server } from "lucide-react";
import Image from "next/image";

export default function FourthSection() {
  return (
    <div className="w-full py-10 px-2 relative">
      {/* Main container with animated RGB border */}
      <div className="container mx-auto rounded-xl bg-gray-50 dark:bg-zinc-900 grid grid-cols-1 md:grid-cols-2 gap-5 md:rounded-2xl p-5 lg:p-10 relative">
        {/* Animated RGB border */}
        <div className="absolute inset-0 rounded-xl md:rounded-2xl p-[1px] z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-xl md:rounded-2xl animate-border-spin opacity-70"></div>
          <div className="absolute inset-[1px] bg-gray-50 dark:bg-zinc-900 rounded-xl md:rounded-2xl"></div>
        </div>

        {/* Text content box */}
        <div className="flex justify-between items-start gap-6 flex-col z-10">
          <div className="flex flex-col gap-4 mb-6">
            <div className="p-3 rounded-lg text-primary">
              <Rocket className="w-14 h-14" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Why Choose CodeBiruni?
            </h2>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            At <span className="font-semibold text-primary">CodeBiruni</span>,
            we don’t just build software — we build digital growth. Our mission
            is to empower businesses through modern web development, intelligent
            automation, and cloud-powered innovation that transforms ideas into
            impactful realities.
          </p>

          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-gray-700 dark:text-gray-200">
                Tailored web & software solutions that fit your goals
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-gray-700 dark:text-gray-200">
                Agile, transparent, and result-driven development
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-gray-700 dark:text-gray-200">
                Ongoing support, maintenance, and scaling assistance
              </span>
            </li>
          </ul>
        </div>

        {/* Visual box */}
        <div className="relative z-10">
          <div className="relative h-full min-h-[300px] md:min-h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-200/50 to-gray-300/30 dark:from-zinc-800/70 dark:to-zinc-900/50 border border-gray-200 dark:border-zinc-700/50">
            <Image
              src={`/whychoesus.png`}
              alt="Why choose CodeBiruni - web & software development"
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Card section */}
      <div className="container mx-auto grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {/* Web Development Card */}
        <div className="group relative h-full p-[1px] rounded-xl md:rounded-2xl overflow-hidden">
          {/* Animated RGB border */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-xl md:rounded-2xl animate-border-spin opacity-70"></div>
          <div className="relative h-full bg-gray-50 dark:bg-zinc-900 rounded-xl md:rounded-2xl p-4 md:p-6 z-10">
            <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
              <Image
                src={`/card1.avif`}
                alt="CodeBiruni web development services"
                width={400}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Web Development</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              We design and develop visually stunning, performance-optimized
              websites that engage users and drive business success — from
              landing pages to full-scale platforms.
            </p>
          </div>
        </div>

        {/* Software Development Card */}
        <div className="group relative h-full p-[1px] rounded-xl md:rounded-2xl overflow-hidden">
          {/* Animated RGB border */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-xl md:rounded-2xl animate-border-spin opacity-70"></div>
          <div className="relative h-full bg-gray-50 dark:bg-zinc-900 rounded-xl md:rounded-2xl p-4 md:p-6 z-10">
            <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
              <Image
                src={`/card2.jpg`}
                alt="CodeBiruni software development solutions"
                width={400}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <Code className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Software Development</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              From management systems to SaaS platforms, we deliver secure,
              scalable, and custom-built software tailored to your exact
              workflow and vision.
            </p>
          </div>
        </div>

        {/* Cloud Services Card */}
        <div className="group relative h-full p-[1px] rounded-xl md:rounded-2xl overflow-hidden">
          {/* Animated RGB border */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-xl md:rounded-2xl animate-border-spin opacity-70"></div>
          <div className="relative h-full bg-gray-50 dark:bg-zinc-900 rounded-xl md:rounded-2xl p-4 md:p-6 z-10">
            <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
              <Image
                src={`/card3.webp`}
                alt="CodeBiruni cloud development services"
                width={400}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <Server className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Cloud Integration</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Empower your business with cloud-based scalability and security.
              We deploy solutions that grow with your needs — fast, reliable,
              and globally accessible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
