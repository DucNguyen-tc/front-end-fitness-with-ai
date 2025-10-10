import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import IntroductionSection from "./IntroductionSection";
import ReviewsSection from "./ReviewsSection";

export default function HomePage() {
  return (
    <>
      <div>
        <HeroSection />
        <FeaturesSection />
        <IntroductionSection />
        <ReviewsSection />
      </div>
    </>
  );
}