/// <reference types="vite/client" />
import { type ReactNode, useEffect } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { SITE_CONFIG } from "../constants/site";
import { DotGrid } from "../components/DotGrid";
import { GravityProvider, useGravity } from "../components/GravityContext";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_CONFIG.title },
      { name: "description", content: SITE_CONFIG.description },
    ],
    links: [
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='6' fill='black'/></svg>",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Space+Mono:wght@400&display=swap",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <div className="max-w-content mx-auto px-6 md:px-8 py-16 md:py-24">
      <h1 className="font-dot text-2xl md:text-3xl uppercase tracking-[0.12em] leading-tight text-text-primary">
        Not Found
      </h1>
      <p className="font-sans text-base tracking-[0.04em] text-text-muted leading-normal mt-4">
        This page does not exist.
      </p>
    </div>
  );
}

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

const FAVICONS = {
  active:
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='10' fill='none' stroke='%23D71921' stroke-width='2'/><circle cx='16' cy='16' r='6' fill='black'/></svg>",
  inactive:
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='6' fill='black'/></svg>",
} as const;

function useDynamicFavicon() {
  useEffect(() => {
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (!link) return;

    link.href = FAVICONS.active;

    function onVisibilityChange() {
      link.href =
        document.visibilityState === "visible"
          ? FAVICONS.active
          : FAVICONS.inactive;
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  useDynamicFavicon();
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-bg text-text-primary min-h-screen">
        <GravityProvider>
          <DotGridWithGravity />
          <div className="relative z-[1]">
            {children}
          </div>
        </GravityProvider>
        <Scripts />
      </body>
    </html>
  );
}

function DotGridWithGravity() {
  const { gravity, footerHeight } = useGravity();
  return <DotGrid gravity={gravity} floorOffset={footerHeight} />;
}
