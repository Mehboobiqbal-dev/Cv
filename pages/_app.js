import "@/styles/globals.css"
import "@/styles/animation.css"
import "@/styles/cssGrid.css"
import "@/styles/Home.module.css"
import "lenis/dist/lenis.css"
import { Analytics } from "@vercel/analytics/react"
import { MotionConfig } from "framer-motion"
import dynamic from "next/dynamic"
import { Inter, JetBrains_Mono } from "next/font/google"
import { useContext } from "react"
import { Toaster } from "sonner"

import CursorFollower from "@/components/CursorFollower"
import SmoothScroll from "@/components/SmoothScroll"
import { PortfolioProvider } from "@/contextApi/PortfolioContext"
import ThemeProvider, { ThemeContext } from "@/context/themeContext"

// The ⌘K palette (cmdk + dialog) loads after the page, so it never slows the first paint.
const CommandPalette = dynamic(() => import("@/components/CommandPalette"), { ssr: false })

// Self-hosted by Next.js at build time: no request to Google from the visitor's browser.
const inter = Inter({ subsets: ["latin"], display: "swap" })
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-mono" })

// Site-wide pieces that need the theme: notices, the ⌘K palette, the cursor ring, smooth scrolling.
const GlobalUI = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <>
      <SmoothScroll />
      <CursorFollower />
      <CommandPalette />
      <Toaster position="bottom-center" richColors theme={theme === "dark" ? "dark" : "light"} />
    </>
  )
}

export default function App({ Component, pageProps }) {
  return (
    // reducedMotion="user": visitors whose device asks for less motion get fades without movement.
    <MotionConfig reducedMotion="user">
      <PortfolioProvider>
        <ThemeProvider>
          <div className={`${inter.className} ${mono.variable}`}>
            <Component {...pageProps} />
            <GlobalUI />
          </div>
          <Analytics />
        </ThemeProvider>
      </PortfolioProvider>
    </MotionConfig>
  )
}
