import { FeaturesSection } from "components/ui/FeaturesSection";
import { TextHoverEffect } from "components/ui/text-hover-effect";
import React from "react";

export default function ThirdSection() {
  return (
    <div>
      <div className="container md:mt-[-100px] mt-[-60px] px-2 mx-auto">
        <TextHoverEffect text="Code Biruni" duration={0.2} />
      </div>
      <div className="container px-2 md:mt-[-120px] pt-[30px] mx-auto">
        <p className="text-neutral-500 max-w-[750px] mx-auto my-2  text-center relative z-10">
          At Code Biruni, we create a user-friendly platform that connects
          people and provides effective digital solutions to support businesses
          and communities.
        </p>
        <FeaturesSection />
      </div>
    </div>
  );
}
