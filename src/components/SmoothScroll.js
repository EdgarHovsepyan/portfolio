import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Scrollbar from "smooth-scrollbar";

const SmoothScroll = ({ children }) => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  let scroller = useRef();
  let scrollPositionX = 0;
  let scrollPositionY = 0;

  useEffect(() => {
    const viewportPage = scroller;
    const bodyScrollBar = Scrollbar.init(viewportPage, {
      damping: 0.1,
      renderByPixels: !("ontouchstart" in document),
      delegateTo: viewportPage,
    });

    bodyScrollBar.addListener(({ offset }) => {
      scrollPositionX = offset.x;
      scrollPositionY = offset.y;
    });

    bodyScrollBar.setPosition(0, 0);
    bodyScrollBar.track.xAxis.element.remove();

    bodyScrollBar.addListener(() => {
      ScrollTrigger.refresh();
    });

    ScrollTrigger.scrollerProxy(viewportPage, {
      scrollTop(value) {
        if (arguments.length) {
          bodyScrollBar.scrollTop = value;
        }
        return bodyScrollBar.scrollTop;
      },
    });

    bodyScrollBar.addListener(ScrollTrigger.update);
  }, []);

  return (
    <>
      <div
        className="scroller"
        ref={(ref) => (scroller = ref)}
        style={{ height: "100vh" }}
      >
        {children}
      </div>
    </>
  );
};

export default SmoothScroll;
