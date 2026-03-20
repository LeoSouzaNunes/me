import type { Feature, Passion, SiteConfig, SocialLink } from "../types";

export const SITE_CONFIG: SiteConfig = {
    name: "Leo",
    title: "Leo",
    description:
        "I'm Leo, full-stack developer and problem solver. This is a space to share some of my passions with code.",
    arcticLeafUrl: "https://www.arcticleaf.com",
    licenseUrl: "#license",
} as const;

export const PASSIONS: readonly Passion[] = [
    { id: "chess", label: "Chess" },
    { id: "languages", label: "Languages" },
    { id: "travel", label: "Travel" },
    { id: "coding", label: "Coding" },
    { id: "music", label: "Music" },
] as const;

export const FEATURES: readonly Feature[] = [
    {
        id: "language-practice",
        title: "Language Practice",
        description: "Interactive exercises for learning new languages.",
        locked: true,
    },
    {
        id: "chess-puzzle-library",
        title: "Chess Puzzle Library",
        description:
            "A curated collection of chess puzzles to sharpen tactics.",
        locked: true,
    },
    {
        id: "chess-books-library",
        title: "Chess Books Library",
        description:
            "Catalog of essential chess literature and study material.",
        locked: true,
    },
    {
        id: "places-ive-been-map",
        title: "Places I've Been Map",
        description:
            "An interactive map of places I've visited around the world.",
        locked: true,
    },
] as const;

export const SOCIAL_LINKS: readonly SocialLink[] = [
    {
        id: "github",
        label: "GitHub",
        href: "https://github.com/LeoSouzaNunes",
    },
    {
        id: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/leonardodesnunes",
    },
    {
        id: "chess",
        label: "Chess.com",
        href: "https://www.chess.com/member/leonardonunezbr",
    },
] as const;
