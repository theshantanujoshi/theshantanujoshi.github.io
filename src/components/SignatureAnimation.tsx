import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import letters from "../utils/letters";

interface SignatureAnimationProps {
  children: string;
  duration?: number;
  delay?: number;
}

function SignatureAnimation({
  children,
  duration = 1,
  delay = 0,
}: SignatureAnimationProps) {
  const signRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(signRef, { once: false, amount: 0.1 });
  const text = children.split("");

  useEffect(() => {
    let isCancelled = false;

    async function animateLetters() {
      if (!signRef.current) return;

      const letterDivs = Array.from(
        signRef.current.children
      ) as HTMLDivElement[];

      // First, reset all paths to their hidden state
      for (let i = 0; i < letterDivs.length; i++) {
        const paths = letterDivs[i].querySelectorAll("path");
        for (const path of Array.from(paths)) {
          const length = path.getTotalLength();
          path.style.transition = "none";
          path.style.strokeDasharray = `${length}`;
          path.style.strokeDashoffset = `${length}`;
        }
      }

      // If we are not in view, we stop after resetting.
      if (!isInView) return;

      // Force a reflow so the reset state takes effect before we apply the animation transition
      void signRef.current.offsetHeight;

      // Execute sequential animation
      for (let i = 0; i < letterDivs.length; i++) {
        if (isCancelled) return;
        const paths = letterDivs[i].querySelectorAll("path");

        for (const path of Array.from(paths)) {
          await new Promise((resolve) => {
            if (isCancelled) return resolve(false);

            path.style.transition = `stroke-dashoffset ${duration}s ease-in-out`;
            path.style.strokeDashoffset = "0";
            
            setTimeout(() => {
              resolve(true);
            }, duration * 1000);
          });
        }

        if (delay > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay * 1000));
        }
      }
    }

    animateLetters();

    return () => {
      isCancelled = true;
    };
  }, [text, duration, delay, isInView]);

  return (
    <div className="signature-main" ref={signRef}>
      {text.map((char, index) =>
        char === " " ? (
          <div key={index} style={{ minWidth: "12px" }}></div>
        ) : letters[char] ? (
          <div
            key={index}
            className={`letter ${char.toLowerCase()} ${
              char === char.toUpperCase() ? "up" : "lo"
            }`}
            dangerouslySetInnerHTML={{ __html: letters[char] }}
          />
        ) : null
      )}
    </div>
  );
}

export default SignatureAnimation;
