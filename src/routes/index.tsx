import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useCallback } from "react";
import { HeroSection } from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { LanguagePracticeBody } from "../components/LanguagePracticeBody";
import { Footer } from "../components/Footer";
import { useGravity } from "../components/GravityContext";
import "../styles/globals.css";

type View = "features" | "language-practice";
type Phase = "visible" | "exiting" | "entering";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { gravity, toggleGravity, setFooterHeight } = useGravity();
  const [activeView, setActiveView] = useState<View>("features");
  const [phase, setPhase] = useState<Phase>("visible");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const switchView = useCallback((target: View) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = prefersReducedMotion ? 0 : 150;

    setPhase("exiting");

    timeoutRef.current = setTimeout(() => {
      setActiveView(target);
      setPhase("entering");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase("visible");
        });
      });
    }, duration);
  }, []);

  const handleFeatureSelect = useCallback(
    (featureId: string) => {
      if (featureId === "language-practice") {
        switchView("language-practice");
      }
    },
    [switchView],
  );

  const handleBack = useCallback(() => {
    switchView("features");
  }, [switchView]);

  const opacityClass = phase === "visible" ? "opacity-100" : "opacity-0";

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1">
        <HeroSection />
        <div
          className={`transition-opacity duration-150 ease-nothing-out ${opacityClass}`}
        >
          {activeView === "features" ? (
            <FeaturesSection onFeatureSelect={handleFeatureSelect} />
          ) : (
            <LanguagePracticeBody onBack={handleBack} />
          )}
        </div>
      </div>
      <Footer
        gravity={gravity}
        onGravityToggle={toggleGravity}
        onHeightChange={setFooterHeight}
      />
    </main>
  );
}
