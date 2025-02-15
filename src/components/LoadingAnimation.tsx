import Lottie from "lottie-react";
import loadingAnimation from "./loading-animation.json";

export default function LoadingAnimation() {
  return (
    <div className="w-24 h-24 mx-auto">
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
} 