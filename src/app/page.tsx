import FAQSection from "./home/FAQSection";
import FourthSection from "./home/FourthSection";
import HomeProject from "./home/HomeProject";
import HomeTastimonial from "./home/HomeTastimonial";
// import SecendSection from "./home/SecendSection";
import ThirdSection from "./home/ThirdSection";
import Global from "./setup/Global";

export default function Home() {
  return (
    <div className="w-full pt-14 md:pt-0">
      <Global />
      {/* <SecendSection /> */}
      <ThirdSection />
      <FourthSection />
      <HomeProject />
      <FAQSection />
      <HomeTastimonial />
    </div>
  );
}
