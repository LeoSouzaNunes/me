import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: {
                    DEFAULT: "#000000",
                    surface: "#0A0A0A",
                    hover: "#111111",
                },
                border: {
                    DEFAULT: "#1A1A1A",
                    hover: "#333333",
                },
                text: {
                    primary: "#FFFFFF",
                    muted: "#666666",
                    hint: "#444444",
                },
                red: {
                    accent: "#D71921",
                },
                blue: {
                    accent: "#32c5fa",
                },
            },
            fontFamily: {
                dot: [
                    "'NDot 57'",
                    "'NDot 55'",
                    "'Space Mono'",
                    "'Share Tech Mono'",
                    "monospace",
                ],
                sans: [
                    "'NType 82'",
                    "-apple-system",
                    "'Helvetica Neue'",
                    "sans-serif",
                ],
                mono: [
                    "'NType 82 Mono'",
                    "'SF Mono'",
                    "'Fira Code'",
                    "monospace",
                ],
            },
            fontSize: {
                xs: ["10px", { lineHeight: "1.5", letterSpacing: "0.04em" }],
                sm: ["11px", { lineHeight: "1.5", letterSpacing: "0.06em" }],
                base: ["13px", { lineHeight: "1.5", letterSpacing: "0.04em" }],
                md: ["14px", { lineHeight: "1.5", letterSpacing: "0.04em" }],
                ui: ["12px", { lineHeight: "1.2", letterSpacing: "0.06em" }],
                lg: ["16px", { lineHeight: "1.2", letterSpacing: "0.08em" }],
                xl: ["24px", { lineHeight: "1.1", letterSpacing: "0.12em" }],
                "2xl": ["32px", { lineHeight: "1.1", letterSpacing: "0.12em" }],
                "3xl": ["40px", { lineHeight: "1.0", letterSpacing: "0.12em" }],
                "4xl": ["56px", { lineHeight: "1.0", letterSpacing: "0.10em" }],
                "5xl": ["72px", { lineHeight: "1.0", letterSpacing: "0.10em" }],
            },
            spacing: {
                "18": "72px",
            },
            borderRadius: {
                none: "0px",
                sm: "2px",
                DEFAULT: "2px",
                md: "4px",
            },
            transitionDuration: {
                "150": "150ms",
                "200": "200ms",
                "250": "250ms",
            },
            transitionTimingFunction: {
                nothing: "ease",
                "nothing-out": "ease-out",
            },
            maxWidth: {
                row: "400px",
                content: "720px",
                page: "1080px",
            },
        },
    },
    plugins: [],
};

export default config;
