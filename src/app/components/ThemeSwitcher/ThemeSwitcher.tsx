"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { SunFilledIcon, MoonFilledIcon } from "@nextui-org/shared-icons";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div>
            {theme === 'dark' ? (
                <Button isIconOnly onClick={() => setTheme('light')} aria-label="Switch to light mode">
                    <SunFilledIcon />
                </Button>
                ) : (
                <Button isIconOnly onClick={() => setTheme('dark')} aria-label="Switch to dark mode">
                    <MoonFilledIcon />
                </Button>
            )}
        </div>
    );
};
