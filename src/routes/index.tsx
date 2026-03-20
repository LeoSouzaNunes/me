import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { Footer } from "../components/Footer";
import { useGravity } from "../components/GravityContext";
import "../styles/globals.css";

export const Route = createFileRoute("/")({
    component: HomePage,
});

function HomePage() {
    const { gravity, toggleGravity, setFooterHeight } = useGravity();
    return (
        <main className="min-h-screen flex flex-col">
            <div className="flex-1">
                <HeroSection />
                <FeaturesSection />
            </div>
            <Footer gravity={gravity} onGravityToggle={toggleGravity} onHeightChange={setFooterHeight} />
        </main>
    );
}
