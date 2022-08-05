import { React, useState } from "react";

export default function BackToTheTop({ scrollTop }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    setScrollPosition(document.body.scrollTop);
    
  };
  const top = {
    display: "none",
  };
  const scroll = {
    display: "block",
  };
 document.addEventListener('scroll', handleScroll,true);

  return (
    <div style={scrollPosition > 0 ? scroll : top}>
    <div
      className="scrollTop"
      onClick={() => scrollTop()}
    >
      <span>^</span>
    </div>
    </div>
  );
}
