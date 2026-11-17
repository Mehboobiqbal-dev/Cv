"use client";
import React, { useState, createContext, useEffect } from "react";
import { flushSync } from "react-dom";

export const ThemeContext = createContext();

// The theme class also goes on <html>, so content rendered outside this tree (the ⌘K palette,
// notices) follows the theme, and the browser's own scrollbars and form controls match it.
const syncRoot = (value) => {
    document.documentElement.classList.toggle("dark", value === "dark");
    document.documentElement.style.colorScheme = value;
};

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("dark");

    // Toggle Theme. When the browser supports View Transitions, the new theme spreads out as a circle
    // from the point that was clicked; otherwise it switches instantly.
    const setThemeFun = (event) => {
        const next = theme === "dark" ? "light" : "dark";
        const apply = () => {
            setTheme(next);
            syncRoot(next);
            localStorage.setItem("myPortfolioProfileTheme", next);
        };
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!document.startViewTransition || reduce) {
            apply();
            return;
        }
        const x = event?.clientX ?? window.innerWidth - 60;
        const y = event?.clientY ?? 40;
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        const transition = document.startViewTransition(() => flushSync(apply));
        transition.ready.then(() => {
            document.documentElement.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                { duration: 700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
            );
        });
    };

    // Get Theme Value From LocalStorage
    useEffect(() => {
        const getTheme = localStorage.getItem("myPortfolioProfileTheme");
        if (!getTheme) {
            syncRoot("dark");
            return
        }
        setTheme(getTheme);
        syncRoot(getTheme);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setThemeFun }}>
            <div className={theme === "dark" ? "dark" : ""}>
                <div className='dark:text-white dark:bg-black'>{children}</div>
            </div>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
