import { useRef, useState, useEffect } from "react";
import { gsap, SteppedEase } from "gsap";

const TypedAnimation = () => {
  const [typeTimeline] = useState(gsap.timeline({ paused: true }));
  let typeing = useRef();
  useEffect(() => {
    typeTimeline.fromTo(
      ".anim-typewriter",
      8,
      {
        width: "0",
      },
      {
        width: "9.25em" /* same as CSS .line-1 width */,
        ease: SteppedEase.config(37),
      },
      0
    );
    // text cursor animation
    typeTimeline.fromTo(
      ".anim-typewriter",
      0.5,
      {
        "border-right-color": "rgba(255,255,255,0.75)",
      },
      {
        "border-right-color": "rgba(255,255,255,0)",
        repeat: 20,
        ease: SteppedEase.config(37),
      },
      0
    );

    typeTimeline.play();
  }, []);

  return (
    <div ref={(el) => (typeing = el)} className="typed anim-typewriter">
      CREATIVE Developer
    </div>
  );
};

export default TypedAnimation;
